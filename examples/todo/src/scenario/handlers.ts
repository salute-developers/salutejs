import { createMatchers } from '@salutejs/scenario';

import { AddNoteCommand, DeleteNoteCommand, DoneNoteCommand, Request, Handler } from './types';

const { selectItem } = createMatchers<Request>();

const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const runAppHandler: Handler = ({ res }) => {
    res.appendSuggestions(['Запиши купить молоко', 'Добавь запись помыть машину']);
    res.setPronounceText('начнем');
    res.appendBubble('Начнем');
};

export const noMatchHandler: Handler = ({ res }) => {
    res.setPronounceText('Я не понимаю');
    res.appendBubble('Я не понимаю');
};

export const addNote: Handler = ({ req, res }) => {
    const { note } = req.variables;
    res.appendCommand<AddNoteCommand>({ type: 'add_note', payload: { note: capitalize(note) } });
    res.appendSuggestions(['Запиши купить молоко', 'Добавь запись помыть машину']);
    res.setPronounceText('Добавлено');
    res.appendBubble('Добавлено');
    res.setAutoListening(true);
};

export const doneNote: Handler = ({ req, res }) => {
    const { note } = req.variables;
    const item = selectItem({ title: note })(req);
    if (note && item?.id) {
        res.appendCommand<DoneNoteCommand>({
            type: 'done_note',
            payload: { id: item.id },
        });

        res.setPronounceText('Умничка');
        res.appendBubble('Умничка');
    }
};

export const deleteNoteApproved: Handler = ({ res, session }) => {
    const { itemId } = session;

    res.appendCommand<DeleteNoteCommand>({
        type: 'delete_note',
        payload: { id: itemId },
    });

    res.setPronounceText('Удалено');
    res.appendBubble('Удалено');
};

export const deleteNoteCancelled: Handler = ({ res }) => {
    res.setPronounceText('Удаление отменено');
    res.appendBubble('Удаление отменено');
};

export const deleteNote: Handler = ({ req, res, session }) => {
    const { note } = req.variables;
    const item = selectItem({ title: note })(req);
    if (note && item?.id) {
        session.itemId = item.id;

        res.setPronounceText('Вы уверены?');
        res.appendBubble('Вы уверены?');
        res.appendSuggestions(['продолжить', 'отменить']);
    }
};
