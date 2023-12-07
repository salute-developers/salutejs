import { SaluteSession } from './salute';

export interface SaluteSessionStorage<S extends Record<string, unknown> = Record<string, unknown>> {
    resolve: (id: string) => Promise<SaluteSession<S>>;
    save: (params: { id: string; session: SaluteSession<S> }) => Promise<void>;
    reset: (id: string) => Promise<void>;
    validate?: () => Promise<void>;
}
