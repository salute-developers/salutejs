import { AppInfo, Meta as MetaOriginal } from './systemMessageOriginal';

// SystemMessagePayload – убрали feature_launcher
// ContentColorSchemeImage – убрали placeholder
// Message – убрали human_normalized_text, human_normalized_text_with_anaphora
// TextAction – убрали should_send_to_backend
// OperatorCardCommand – теперь message_id === number
// FixedContentHeight – убрали required
// AspectRatio – убрали required
// IconAndValueView – убрали required
// RightCellArrayView – убрали log_id

// `eva` должна быть заменена на `athena`
export * from './systemMessageOriginal';

/**
 * Идентификатор канала коммуникации
 */
export type UserChannel = 'B2C' | 'SBOL' | 'COMPANION_B2C';

/**
 * Поверхность, от которой приходит вызов ассистента. Например, приложение СберБанк Онлайн или SberBox.
 */
export type Surface =
    | 'SBERBOX'
    | 'SBERBOOM'
    | 'SBERBOOM_MINI'
    | 'SBERBOOM_R2'
    | 'COMPANION'
    | 'STARGATE'
    | 'SATELLITE'
    | 'TIME'
    | 'SBOL'
    | 'TV'
    | 'TV_HUAWEI';

/**
 * Доступные id контекстов для поиска. Например, если задать для какого-то контекста префиксы ('позвони', 'набери'), то
 * ASR будет искать в этом контексте только, если встретит слова 'позвони' или 'набери'. Если задать пустой набор
 * префиксов, то ASR будет искать в этом контексте в любом случае. Таким образом, если мы хотим, чтобы поиск происходил
 * по всем дефолтным префиксам, для значений идентификаторов контекста context_id (mobile_contacts, vk_contacts,
 * vk.fiends) префиксы указывать необязательно.
 */
export type ASRContextsId = 'mobile_contacts' | 'vk_contacts' | 'vk.fiends';

/**
 * @deprecated
 * Такой формат экшенов устарел, используй ServerAction
 */
export interface DeprecatedServerAction {
    payload: unknown;
    type: string;
}

export interface ServerAction {
    action_id: string;
    parameters?: unknown;
}

/**
 * Запрос поиска от сценария.
 */
export interface StartSmartSearchAction {
    /**
     * Тип действия.
     */
    type: 'start_smart_search';
    /**
     * Данные запроса.
     */
    start_smart_search: {
        /**
         * Текст запроса, который прислал сценарий.
         */
        query: string;
        /**
         * Время за которое поиск должен ответить.
         */
        timeoutMS?: string;
    };
    [k: string]: unknown;
}

/**
 * Действие, которое обозначает обработку сервер-экшена ассистентом или хост-приложением.
 */
export interface ActionForServerAction {
    /**
     * Тип действия.
     */
    type: 'server_action';
    /**
     * Данная строка будет подставлена в исходящее с мобильного SDK системное сообщение в поле MESSAGE_NAME.
     */
    message_name?: string;
    /**
     * Используется для фильтрации данных, явно указывающая на то, что server_action не может повлиять на состояние UI в
     * SDK (фильтруется озвучка, саджесты и возможность открыть новый экран).
     */
    mode?: 'background' | 'foreground';
    /**
     * Сервер-экшен, который нужно отправить.
     */
    server_action: {
        [k: string]: unknown;
    };
    [k: string]: unknown;
}

export interface AppState {
    item_selector?: {
        /**
         * Список соответствий голосовых команд действиям в веб-приложении.
         */
        items: {
            /**
             * Порядковый номер элемента, назначается смартаппом, уникален в рамках items.
             */
            number?: number;
            /**
             * Уникальный id элемента.
             */
            id?: string;
            /**
             * Ключевая фраза, которая должна приводить к данному действию.
             */
            title?: string;
            /**
             * Фразы-синонимы, которые должны быть расценены как данное действие.
             */
            aliases?: string[];
            /**
             * Сервер экшен, проксирует action обратно на бекэнд.
             */
            server_action?: unknown;
            /**
             * Экшен, который вернется в AssistantSmartAppData.
             */
            action?: unknown;
            [k: string]: unknown;
        }[];
        ignored_words?: string[];
        [k: string]: unknown;
    };
    [k: string]: unknown;
}

export type Meta = Omit<MetaOriginal, 'current_app' | 'background_apps'> & {
    current_app?: {
        app_info: AppInfo;
        state: AppState;
        [k: string]: unknown;
    };
    background_apps?: {
        app_info: AppInfo;
        state: AppState;
        [k: string]: unknown;
    }[];
};
