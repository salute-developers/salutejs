import { i18n } from './i18n';
import { KeysetDictionary } from './types/i18n';
import { NLPRequest, NLPRequestMTS, NLPRequestSA } from './types/request';
import { Inference, SaluteRequest, Variant } from './types/salute';
import { DeprecatedServerAction } from './types/systemMessage';

export const createSaluteRequest = <Rq extends SaluteRequest = SaluteRequest>(request: NLPRequest) => {
    let inference: Inference;
    let variant: Variant;
    const variables: Record<string, unknown> = {};

    return {
        get character() {
            return request.payload.character.id;
        },
        get appInfo() {
            return (request as NLPRequestSA).payload.app_info;
        },
        get message() {
            return (request as NLPRequestMTS).payload.message;
        },
        get systemIntent() {
            return (request as NLPRequestMTS).payload.intent;
        },
        get variant() {
            return variant;
        },
        get profile() {
            if (request.messageName === 'TAKE_PROFILE_DATA') {
                return request.payload.profile_data;
            }

            return undefined;
        },
        get inference() {
            return inference;
        },
        get request() {
            return request;
        },
        get state() {
            return (request as NLPRequestMTS).payload.meta?.current_app?.state;
        },
        get serverAction() {
            // здесь DeprecatedServerAction поскольку используем в SaluteRequest по-умолчанию DeprecatedServerAction
            return ((request as NLPRequestSA).payload.server_action as unknown) as DeprecatedServerAction;
        },
        get voiceAction() {
            return (
                !(request as NLPRequestSA).payload.server_action &&
                (request as NLPRequestMTS).payload.intent !== 'close_app' &&
                (request as NLPRequestMTS).payload.original_intent !== 'run_app'
            );
        },
        get variables() {
            return variables;
        },
        setInference: (value: Inference) => {
            inference = value;
        },
        setVariable: (name: string, value: string) => {
            variables[name] = value;
        },
        i18n: (keyset: KeysetDictionary) => {
            return i18n(request.payload.character.id)(keyset);
        },
        setVariant(v) {
            variant = v;
        },
    } as Rq;
};
