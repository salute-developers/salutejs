![salutejs](https://user-images.githubusercontent.com/982072/112627725-0606e400-8e43-11eb-86ef-a9e2fdcfc465.png)

# SaluteJS

__Набор утилит для описания пользовательских сценариев [семейства Виртуальных Ассистентов "Салют"](https://bit.ly/3vNuhXY)__.

- инструментированый код: автокомплишен по интентам и стейту приложения;
- типизация из коробки: встроенные типы полностью включают в себя описание [SmartApp API](https://developers.sber.ru/docs/ru/va/api/overview);
- единые типы команд между сценарием и [Canvas Apps](https://developers.sber.ru/docs/ru/va/canvas/title-page);
- единый формат API с [Salutejs Client](https://github.com/salute-developers/salutejs-client);
- валидация переменных сущностей в райнтайме;
- интеграция с любыми nodejs web-фреймворками: [expressjs](https://github.com/expressjs), [hapi](https://github.com/hapijs/hapi), [koa](https://github.com/koajs/koa);
- интеграция с любыми клиентскими фреймворками: [NextJS](https://github.com/vercel/next.js), [Gatsby](https://github.com/gatsbyjs);
- использование любых видов рекогнайзеров: RegExp, [String Similarity](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient), [SmartApp Brain](https://developer.sberdevices.ru/docs/ru/developer_tools/ide/platform_ux/nlu_core_caila/nlu_core_caila);
- API для создания своих рекогнайзеров;
- синхронизация интентов и сущностей с [SmartApp Brain](https://developers.sber.ru/docs/ru/va/code/nlp/overview);
- адаптеры для работы с сессией: memory, mongodb, redis;
- поддержка составления словарей реплик для всех персонажей.

## Состав пакетов

- [@salutejs/scenario](https://github.com/salute-developers/salutejs/tree/master/packages/scenario) - фреймворк описания пользовательских сценариев;
- [@salutejs/recognizer-smartapp-brain](https://github.com/salute-developers/salutejs/tree/master/packages/recognizer-smartapp-brain) - рекогнайзер SmartApp Brain;
- [@salutejs/recognizer-string-similarity](https://github.com/salute-developers/salutejs/tree/master/packages/recognizer-string-similarity) - рекогнайзер string similarity;
- [@salutejs/storage-adapter-firebase](https://github.com/salute-developers/salutejs/tree/master/packages/storage-adapter-firebase) - адаптер для хранения сессии в firebase;
- [@salutejs/storage-adapter-memory](https://github.com/salute-developers/salutejs/tree/master/packages/storage-adapter-memory) - адаптер для хранения сессии в памяти процесса;
