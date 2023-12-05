import { SaluteSession, SaluteSessionStorage } from '@salutejs/scenario';

export class SaluteMemoryStorage implements SaluteSessionStorage {
    private sessions: Record<string, SaluteSession> = {};

    async resolve(id: string) {
        return Promise.resolve(
            this.sessions[id] || {
                path: [],
                variables: {},
                slotFilling: false,
                state: {},
            },
        );
    }

    async save({ id, session, lifetime = 0 }: { id: string; session: SaluteSession; lifetime?: number }) {
        this.sessions[id] = session;
        if (lifetime > 0) {
            this.sessions[id].expires = Date.now() + lifetime;
        }

        return Promise.resolve();
    }

    async reset(id: string) {
        this.sessions[id] = this.sessions[id] || {
            path: [],
            variables: {},
            slotFilling: false,
            state: {},
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
