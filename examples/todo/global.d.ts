import { AssistantWindow } from '@salutejs/client';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toBeEqualResponse(expected: NLPResponseATU);
        }
    }
    interface Window extends AssistantWindow {
        Cypress?: Record<string, any>;
    }
}

export {};
