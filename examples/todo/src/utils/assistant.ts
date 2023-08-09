import { AssistantAppState, createAssistant, createSmartappDebugger } from '@salutejs/client';

export const isRunInCypress = typeof window !== 'undefined' && window.Cypress;

export type Assistant = ReturnType<typeof createAssistant> | ReturnType<typeof createSmartappDebugger>;

export const assistantState: { current: AssistantAppState } = {
    current: {},
};
export const getState = () => assistantState.current;

export const initAssistant = () => {
    if (typeof window === 'undefined') {
        return;
    }

    let assistant: Assistant;

    if (process.env.NODE_ENV === 'production') {
        assistant = createAssistant({
            getState,
        });
    }

    if (
        process.env.NODE_ENV === 'development' &&
        process.env.NEXT_PUBLIC_SMARTAPP_TOKEN &&
        process.env.NEXT_PUBLIC_SMARTAPP_INIT_PHRASE &&
        !isRunInCypress
    ) {
        assistant = createSmartappDebugger({
            token: process.env.NEXT_PUBLIC_SMARTAPP_TOKEN,
            initPhrase: process.env.NEXT_PUBLIC_SMARTAPP_INIT_PHRASE,
            getState,
        });
    }

    return assistant;
};

export const assistantInstance: Assistant | undefined = initAssistant();
