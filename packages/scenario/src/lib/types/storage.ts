import { SaluteSession } from './salute';

export interface SaluteSessionStorage {
    resolve: (id: string) => Promise<SaluteSession>;
    save: (params: { id: string; session: SaluteSession }) => Promise<void>;
    reset: (id: string) => Promise<void>;
    validate?: () => Promise<void>;
}
