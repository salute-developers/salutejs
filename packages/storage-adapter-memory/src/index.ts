import { SaluteSession, SaluteSessionStorage } from '@salutejs/scenario';

export class SaluteMemoryStorage implements SaluteSessionStorage {
    private sessions: Record<string, SaluteSession> = {};

    private lifetime: number;

    constructor({ lifetime = 60 * 60 * 1000 }: { lifetime?: number } = {}) {
        this.lifetime = lifetime;

        setInterval(this.validate.bind(this), 60 * 1000);
    }

    async resolve(id: string) {
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

    async save({ id, session }: { id: string; session: SaluteSession }) {
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
