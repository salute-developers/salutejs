import { useReducer, useState, useEffect, FormEvent } from 'react';
import { AssistantClientCustomizedCommand, AssistantSmartAppData } from '@salutejs/client';
import { Card, CardContent, Cell, Container, Row, Col, TextBox, TextField, Checkbox } from '@salutejs/plasma-ui';

import { Action, reducer } from '../store';
import { assistantInstance, assistantState } from '../utils/assistant';

interface TodoCommand extends AssistantSmartAppData {
    smart_app_data: Action;
}

const IndexPage = () => {
    const [appState, dispatch] = useReducer(reducer, {
        notes: [{ id: 'uinmh', title: 'купить хлеб', completed: false }],
    });

    const [note, setNote] = useState('');

    useEffect(() => {
        return assistantInstance?.on('data', (command: AssistantClientCustomizedCommand<TodoCommand>) => {
            switch (command.type) {
                case 'smart_app_data':
                    dispatch(command.smart_app_data);
                    break;
                default:
                    break;
            }
        });
    }, []);

    useEffect(() => {
        assistantState.current = {
            item_selector: {
                items: appState.notes.map(({ id, title }, index) => ({
                    number: index + 1,
                    id,
                    title,
                })),
            },
        };
    }, [appState]);

    const doneNote = (title: string) => {
        assistantInstance?.sendAction({ type: 'done', payload: { note: title } });
    };

    return (
        <Container style={{ margin: '5rem 0 7rem' }}>
            <Row>
                <Col size={12} sizeXL={6} offsetXL={3}>
                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            dispatch({ type: 'add_note', payload: { note } });
                            setNote('');
                        }}
                    >
                        <TextField label="Add Note" value={note} onChange={({ target: { value } }) => setNote(value)} />
                    </form>
                </Col>
            </Row>
            <Row style={{ marginTop: '2rem' }}>
                {appState.notes.map((n, i) => (
                    <Col key={i} size={12} sizeXL={6} offsetXL={3} style={{ marginBottom: '1rem' }}>
                        <Card>
                            <CardContent compact>
                                <Cell
                                    // @ts-ignore
                                    content={<TextBox title={`${i + 1}. ${n.title}`} />}
                                    contentRight={<Checkbox checked={n.completed} onChange={() => doneNote(n.title)} />}
                                />
                            </CardContent>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default IndexPage;
