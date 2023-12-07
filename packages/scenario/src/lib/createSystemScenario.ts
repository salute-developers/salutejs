import { PayDialogFinishedServerAction } from './types/payment';
import { SaluteHandler, SaluteRequest, SaluteRequestVariable } from './types/salute';
import { AppState } from './types/systemMessage';

export type SystemScenario<Sh extends SaluteHandler = SaluteHandler> = {
    RUN_APP: Sh;
    CLOSE_APP: Sh;
    NO_MATCH: Sh;
    PAY_DIALOG_FINISHED?: SaluteHandler<SaluteRequest<SaluteRequestVariable, AppState, PayDialogFinishedServerAction>>;
};

export const createSystemScenario = (systemScenarioSchema?: Partial<SystemScenario>): SystemScenario => {
    return {
        RUN_APP: ({ res }) => {
            res.setPronounceText('Добро пожаловать!');
        },
        CLOSE_APP: () => {},
        NO_MATCH: ({ res }) => {
            res.setPronounceText('Не понимаю');
        },
        ...systemScenarioSchema,
    };
};
