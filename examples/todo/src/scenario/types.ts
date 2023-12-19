import { SaluteCommand, SaluteRequestVariable, SaluteRequest, SaluteHandler } from '@salutejs/scenario';

export interface Note {
    id: string;
    title: string;
    completed: boolean;
}

export interface InitCommand extends SaluteCommand {
    type: 'init';
    payload: {
        notes: Array<Note>;
    };
}

export interface AddNoteCommand extends SaluteCommand {
    type: 'add_note';
    payload: {
        note: string;
    };
}

export interface DoneNoteCommand extends SaluteCommand {
    type: 'done_note';
    payload: {
        id: string;
    };
}

export interface DeleteNoteCommand extends SaluteCommand {
    type: 'delete_note';
    payload: {
        id: string;
    };
}

export interface NoteVariable extends SaluteRequestVariable {
    note: string;
}

export type Session = {
    itemId: string;
};

export type Request = SaluteRequest<NoteVariable>;
export type Handler = SaluteHandler<Request, Session>;
