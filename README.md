![salutejs](https://user-images.githubusercontent.com/982072/112627725-0606e400-8e43-11eb-86ef-a9e2fdcfc465.png)

# SaluteJS

__Set of minimalistic utils for [Salute Assistants](https://bit.ly/3vNuhXY) scenario implementation__.

- directly in code autocomplete for intents and app state;
- strongly typed out of the box: whole [SmartApp API](https://developers.sber.ru/docs/ru/va/api/overview) types inside;
- common types between scenario and [Canvas Apps](https://developers.sber.ru/docs/ru/va/canvas/title-page);
- common API with [Salutejs Client](https://github.com/salute-developers/salutejs-client);
- runtime enitity variables and state validation;
- nodejs web-frameworks integration support: [expressjs](https://github.com/expressjs), [hapi](https://github.com/hapijs/hapi), [koa](https://github.com/koajs/koa);
- client frameworks integration support: [NextJS](https://github.com/vercel/next.js), [Gatsby](https://github.com/gatsbyjs);
- any types of recognizers: RegExp, [String Similarity](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient), [SmartApp Brain](https://developer.sberdevices.ru/docs/ru/developer_tools/ide/platform_ux/nlu_core_caila/nlu_core_caila);
- custom recognizer API;
- intents and entities sync with [SmartApp Brain](https://developers.sber.ru/docs/ru/va/code/nlp/overview);
- session persisting adapters: memory, mongodb, redis;
- assistants based phrases dictionary declaration support.

## What's inside

- [@salutejs/scenario](https://github.com/salute-developers/salutejs/tree/master/packages/scenario) - user scenario framework;
- [@salutejs/recognizer-smartapp-brain](https://github.com/salute-developers/salutejs/tree/master/packages/recognizer-smartapp-brain) - SmartApp Brain recognizer;
- [@salutejs/recognizer-string-similarity](https://github.com/salute-developers/salutejs/tree/master/packages/recognizer-string-similarity) - string similarity recognizer;
- [@salutejs/storage-adapter-firebase](https://github.com/salute-developers/salutejs/tree/master/packages/storage-adapter-firebase) - in firebase session storage adapter;
- [@salutejs/storage-adapter-memory](https://github.com/salute-developers/salutejs/tree/master/packages/storage-adapter-memory) - in memory session storage adapter;

### Translations

- [Русский](https://github.com/salute-developers/salutejs/blob/master/README.ru.md)
