import express from 'express';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import type { Socket } from 'socket.io';
import next from 'next';
import { NLPRequest, NLPResponse } from '@salutejs/scenario';
import bodyParser from 'body-parser';

const app = express();
const server = new Server(app);
const io = new SocketServer(server, {
    cors: {
        origin: "*"
    }
});
let socket: Socket;

app.use(bodyParser.json());

const requestMap: Record<string, (data: NLPResponse) => void> = {};

// socket.io server
io.on('connection', (ioSocket) => {
    socket = ioSocket;

    ioSocket.on('outcoming', (data: NLPResponse) => {
        requestMap[data.messageId.toString()](data);
        delete requestMap[data.messageId.toString()];
    });
});

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    app.post('/hook', async ({ body }: { body: NLPRequest }, response) => {
        const answer: NLPResponse = await new Promise((resolve) => {
            if (typeof socket !== 'undefined') {
                requestMap[body.messageId.toString()] = resolve;
                socket.emit('incoming', body);
            } else {
                const { messageId, sessionId, uuid, payload } = body;

                response.status(200).type('application/json').send(JSON.stringify({
                    messageName: 'ANSWER_TO_USER',
                    messageId,
                    sessionId,
                    uuid,
                    payload: {
                        pronounceText: 'Дай любое задание',
                        device: payload.device,
                        projectName: payload.projectName,
                        items: [],
                        finished: false,
                        suggestions: { buttons: [{
                            title: 'сложи 5 и - 2',
                            action: { type: 'text', text: 'сложи 5 и - 2', should_send_to_backend: true }
                        }] },
                    },
                }));
            }
        });

        response.status(200).type('application/json').send(JSON.stringify(answer));
    });

    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(port);
});
