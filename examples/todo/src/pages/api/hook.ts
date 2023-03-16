import { NextRequest } from 'next/server';
import { NLPRequest } from '@salutejs/scenario';
import { parse, stringify } from 'lossless-json';

import { handleNlpRequest } from '../../scenario/scenario';

export const config = {
    runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
    const body = await req.text();
    const answer = await handleNlpRequest(parse(body) as NLPRequest);

    return new Response(stringify(answer), {
        status: 200,
        headers: {
            'content-type': 'application/json',
        },
    });
}
