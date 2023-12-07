import { SaluteSession, SaluteSessionStorage } from '@salutejs/scenario';

export class SaluteMemoryStorage<S extends Record<string, unknown> = Record<string, unknown>>
    implements SaluteSessionStorage {
    private sessions: Record<string, SaluteSession<S>> = {};

    private lifetime: number;

    constructor({ lifetime = 60 * 60 * 1000 }: { lifetime?: number } = {}) {
        this.lifetime = lifetime;
    }

    async resolve(id: string) {
        this.validate();

        return Promise.resolve(
            this.sessions[id] || {
                path: [],
                variables: {},
                slotFilling: false,
                state: {},
                expires: this.lifetime > 0 ? Date.now() + this.lifetime : undefined,
            },
        );
    }

    async save({ id, session }: { id: string; session: SaluteSession<S> }) {
        this.sessions[id] = session;

        if (this.lifetime > 0) {
            this.sessions[id].expires = Date.now() + this.lifetime;
        }

        return Promise.resolve();
    }

    async reset(id: string) {
        this.sessions[id] = this.sessions[id] || {
            path: [],
            variables: {},
            slotFilling: false,
            state: {},
            expires: this.lifetime > 0 ? Date.now() + this.lifetime : undefined,
        };

        return Promise.resolve();
    }

    async validate() {
        Object.keys(this.sessions).forEach((sessionId) => {
            const { expires } = this.sessions[sessionId];

            if (expires && expires < Date.now()) {
                delete this.sessions[sessionId];
            }
        });

        return Promise.resolve();
    }
}
