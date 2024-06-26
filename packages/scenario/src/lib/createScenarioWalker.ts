import { UserScenario } from './createUserScenario';
import { SystemScenario } from './createSystemScenario';
import { lookupMissingVariables } from './missingVariables';
import {
    IntentsDict,
    Recognizer,
    SaluteRequest,
    SaluteHandler,
    SaluteResponse,
    SaluteSession,
    SaluteRequestVariable,
} from './types/salute';
import { AppState, ServerAction, DeprecatedServerAction } from './types/systemMessage';
import { NLPRequestMTS } from './types/request';
import { PayDialogFinishedServerAction } from './types/payment';

const buildNormalizedServerAction = (action: Partial<ServerAction> & DeprecatedServerAction): ServerAction => {
    if (typeof action.action_id !== 'undefined') {
        return action as ServerAction;
    }

    return {
        action_id: action.type,
        parameters: action.payload,
    };
};

type CreateScenarioWalkerParams<Rq extends SaluteRequest, Sh extends SaluteHandler> = {
    intents?: IntentsDict;
    recognizer?: Recognizer;
    systemScenario: SystemScenario;
    userScenario?: UserScenario<Rq, Sh>;
    slotFillingConfidence?: number;
};

export const createScenarioWalker = <
    Rq extends SaluteRequest,
    Session extends Record<string, unknown>,
    Sh extends SaluteHandler<Rq, Session>
>({
    intents,
    recognizer,
    systemScenario,
    userScenario,
    slotFillingConfidence = 0,
}: CreateScenarioWalkerParams<Rq, Sh>) => {
    return async <R extends Rq = Rq>({
        req,
        res,
        session,
    }: {
        req: R;
        res: SaluteResponse;
        session: SaluteSession<Session>;
    }) => {
        const dispatch = async (path: string[]) => {
            if (!userScenario) return;

            const state = userScenario.getByPath(path);

            if (state) {
                session.path = path;
                req.currentState = {
                    path: session.path,
                    state,
                };

                if (req.variant && intents) {
                    // SLOTFILING LOGIC START
                    let currentIntent = req.variant;

                    if (session.path.length > 0 && session.slotFilling) {
                        // ищем связь с текущим интентом в сессии и результатах распознавания
                        const connected = (req.inference?.variants || []).find(
                            (v) => v.confidence >= slotFillingConfidence && v.intent.path === session.currentIntent,
                        );
                        currentIntent = connected || req.variant;
                    }

                    const currentIntentPath = currentIntent.intent.path;
                    session.currentIntent = currentIntentPath;

                    // Here we substitue some variables even if their name is different
                    // it is important for slot filling since smart app brain can't tell
                    // a variable name if there are multiple slots with the same entity type
                    // in a single intent.
                    currentIntent.slots.forEach((slot) => {
                        if (slot.array) {
                            if (typeof req.variables[slot.name] === 'undefined') {
                                req.setVariable(slot.name, []);
                            }

                            ((req.variables[slot.name] as unknown) as Array<string>).push(slot.value);
                            return;
                        }

                        if (slot.name in req.variables && session.missingVariableName) {
                            const variableName = slot.name;
                            const areSlotTypesEqual =
                                intents[currentIntentPath]?.variables?.[session.missingVariableName].entity ===
                                intents[currentIntentPath]?.variables?.[variableName].entity;

                            if (areSlotTypesEqual) {
                                req.setVariable(session.missingVariableName, slot.value);
                                delete session.missingVariableName;
                            }
                        } else {
                            req.setVariable(slot.name, slot.value);
                        }
                    });

                    // ищем незаполненные переменные, задаем вопрос пользователю
                    const missingVars = lookupMissingVariables(currentIntentPath, intents, req.variables);
                    if (missingVars.length > 0) {
                        // сохраняем состояние в сессии
                        Object.keys(req.variables).forEach((name) => {
                            session.variables[name] = req.variables[name];
                        });

                        // задаем вопрос
                        const { question, name } = missingVars[0];

                        session.missingVariableName = name;

                        res.appendBubble(question);
                        res.setPronounceText(question);

                        // устанавливаем флаг слотфиллинга, на него будем смотреть при следующем запросе пользователя
                        session.slotFilling = true;

                        return;
                    }
                    // SLOTFILING LOGIC END
                }

                await state.handle({ req, res, session: session.state, history: {} }, dispatch);
            }
        };

        const normalizedServerAction =
            // @ts-ignore
            typeof req.serverAction === 'undefined' ? undefined : buildNormalizedServerAction(req.serverAction);
        const saluteHandlerOpts = { req, res, session: session.state, history: {} };

        if (req.systemIntent === 'run_app') {
            // @ts-ignore
            if (req.serverAction?.action_id === 'PAY_DIALOG_FINISHED') {
                if (typeof systemScenario.PAY_DIALOG_FINISHED === 'undefined') {
                    res.appendError({
                        code: 404,
                        description: 'Missing handler for action: "PAY_DIALOG_FINISHED"',
                    });
                    return;
                }

                await systemScenario.PAY_DIALOG_FINISHED(
                    (saluteHandlerOpts as unknown) as typeof saluteHandlerOpts & {
                        req: SaluteRequest<SaluteRequestVariable, AppState, PayDialogFinishedServerAction>;
                    },
                    dispatch,
                );
                return;
            }

            if (
                (req.request as NLPRequestMTS).payload.original_intent === 'run_app' ||
                req.request.messageName === 'RUN_APP'
            ) {
                await systemScenario.RUN_APP(saluteHandlerOpts, dispatch);
                return;
            }
        }

        if (req.systemIntent === 'close_app') {
            await systemScenario.CLOSE_APP(saluteHandlerOpts, dispatch);
            return;
        }

        // restore request from session
        Object.keys(session.variables).forEach((name) => {
            req.setVariable(name, session.variables[name]);
        });

        if (typeof intents !== undefined && userScenario) {
            // restore request from server_action payload
            if (normalizedServerAction) {
                Object.entries((normalizedServerAction.parameters || {}) as Record<string, unknown>).forEach(
                    ([key, value]) => {
                        req.setVariable(key, value);
                    },
                );
            }

            if (req.voiceAction && typeof recognizer !== 'undefined') {
                await recognizer.inference({ req, res, session });
            }

            const scenarioState = userScenario.resolve(session.path, req);

            if (normalizedServerAction && typeof intents !== 'undefined') {
                if (!scenarioState) {
                    res.appendError({
                        code: 404,
                        description: `Missing handler for action: "${normalizedServerAction.action_id}"`,
                    });

                    return;
                }

                const missingVars = lookupMissingVariables(normalizedServerAction.action_id, intents, req.variables);
                if (missingVars.length) {
                    res.appendError({
                        code: 500,
                        description: `Missing required variables: ${missingVars
                            .map(({ name }) => `"${name}"`)
                            .join(', ')}`,
                    });

                    return;
                }
            }

            if (scenarioState) {
                req.currentState = scenarioState;
                await dispatch(scenarioState.path);

                if (!req.currentState.state.children && !session.slotFilling) {
                    session.path = [];
                    session.variables = {};
                    session.currentIntent = undefined;
                }

                return;
            }
        }

        await systemScenario.NO_MATCH(saluteHandlerOpts, dispatch);
    };
};
