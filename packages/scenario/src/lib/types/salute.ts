/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import {
    AppInfo,
    CharacterId,
    AppState,
    Message,
    SmartAppErrorCommand,
    EmotionId,
    Card,
    Bubble,
    Button,
    ASRHints,
    PolicyRunAppComand,
    ServerAction,
    DeprecatedServerAction,
} from './systemMessage';
import { NLPRequest, NLPRequestTPD } from './request';
import { NLPResponse, NLPResponseATU, NLPResponseCPD, NLPResponseType } from './response';
import { KeysetDictionary, I18nOptions } from './i18n';

interface IntentSlot {
    name: string; // имя сущности
    entity: string; // тип сущности
    required: boolean; // наличие сущности обязательно
    prompts: string[]; // ???
    array: boolean;
}

interface FoundSlot {
    name: string;
    value: string;
    array: boolean;
}

export interface Intent {
    id: number;
    path: string;
    answer?: string;
    customData?: string;
    slots: IntentSlot[]; // сущности в фразе
}

export interface Variant {
    intent: Intent;
    confidence: number; // вероятностная оценка соответствия интента
    slots: FoundSlot[]; // распознанные сущности
}

export interface Inference {
    variants: Variant[];
}

export interface SaluteCommand {
    type: string;
    payload?: { [key: string]: unknown };
}

export type SaluteRequestVariable = Record<string, string | string[] | undefined>;

export interface SaluteRequest<
    V = SaluteRequestVariable,
    S = AppState,
    A extends DeprecatedServerAction | ServerAction | unknown = unknown
> {
    readonly character: CharacterId;
    readonly appInfo: AppInfo;
    readonly message: Message;
    readonly serverAction?: A;
    readonly voiceAction: boolean;
    readonly systemIntent: string;
    readonly variant: Variant;
    readonly inference?: Inference;
    readonly request: NLPRequest;
    readonly state?: S;
    readonly variables: V;
    readonly profile?: NLPRequestTPD['payload']['profile_data'];
    setInference: (value: Inference) => void;
    setVariable: (name: string, value: unknown) => void;
    currentState?: {
        path: string[];
        state: ScenarioSchema['string'];
    };
    i18n: (keyset: KeysetDictionary) => (key: string, options?: I18nOptions) => string;
    setVariant: (intent: Variant) => void;
}

export interface SaluteResponse<T extends NLPResponse = NLPResponseATU> {
    appendBubble: (bubble: string, options?: { expand_policy?: Bubble['expand_policy']; markdown?: boolean }) => void;
    appendCard: (card: Card) => void;
    appendCommand: <C = SaluteCommand>(command: C) => void;
    /** @deprecated */
    appendItem: (command: any) => void;
    appendError: (error: SmartAppErrorCommand['smart_app_error']) => void;
    appendSuggestions: (suggestions: Array<string | Button>) => void;
    askPayment: (invoiceId: number) => void;
    finish: () => void;
    runApp: (server_action: PolicyRunAppComand['nodes']['server_action']) => void;
    setIntent: (text: string) => void;
    setPronounceText: (text: string, options?: { ssml?: boolean }) => void;
    setAutoListening: (value: boolean) => void;
    setASRHints: (hints: ASRHints) => void;
    setEmotion: (emotion: EmotionId) => void;
    setPayload: (
        payload: NLPResponse['payload'] | Record<string, unknown>,
        messageName?: NLPResponseType | string,
    ) => void;
    getProfileData: () => void;
    chooseProfileData: (fields: NLPResponseCPD['payload']['fields']) => void;
    getDetailedProfileData: () => void;
    openDeepLink: (deepLink: string) => void;
    overrideFrontendEndpoint: (frontendEndpoint: string) => void;
    error: (status: { code: number; description?: string }) => void;
    nothingFound: () => void;
    readonly message: T;
}

export type SaluteHandler<
    Rq extends SaluteRequest = SaluteRequest,
    S extends Record<string, unknown> = Record<string, unknown>,
    Rs extends SaluteResponse = SaluteResponse,
    H extends Record<string, unknown> = Record<string, unknown>
> = (options: { req: Rq; res: Rs; session: S; history: H }, dispatch?: (path: string[]) => void) => void;

export interface SaluteIntentVariable {
    required?: boolean;
    questions?: string[];
    array?: boolean;
    entity?: string;
}

export interface TextIntent {
    matchers: Array<{
        type: string;
        rule: string;
    }>;
}

export interface ServerActionIntent {
    action: string;
}

export type SaluteIntent = (
    | (Required<TextIntent> & Partial<ServerActionIntent>)
    | (Required<ServerActionIntent> & Partial<TextIntent>)
) & {
    variables?: Record<string, SaluteIntentVariable>;
};

export type IntentsDict = Record<string, SaluteIntent>;

export type SaluteSession<S extends Record<string, unknown> = Record<string, unknown>> = {
    path: string[];
    slotFilling: boolean;
    variables: {
        [key: string]: unknown;
    };
    currentIntent?: string;
    state: S;
    missingVariableName?: string;
    expires?: number;
};

export interface Recognizer {
    inference: (options: { req: SaluteRequest; res: SaluteResponse; session: SaluteSession }) => void;
}

export type ScenarioSchemaItem<
    Rq extends SaluteRequest = SaluteRequest,
    Sh extends SaluteHandler<Rq> = SaluteHandler<Rq>
> = {
    match: (req: Rq) => boolean;
    schema?: string;
    handle: Sh;
    children?: Record<string, ScenarioSchemaItem<Rq, Sh>>;
};

export type ScenarioSchema<
    Rq extends SaluteRequest = SaluteRequest,
    Sh extends SaluteHandler<Rq> = SaluteHandler<Rq>
> = Record<string, ScenarioSchemaItem<Rq, Sh>>;
