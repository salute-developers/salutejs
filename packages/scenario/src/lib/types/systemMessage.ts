import {
    ExtendedListCard as ExtendedListCardGenerated,
    GalleryCard as GalleryCardGenerated,
    GridCard as GridCardGenerated,
    ListCard as ListCardGenerated,
    SystemMessagePayload as SystemMessagePayloadGenerated,
    AppState as AppStateGenerated,
    Url as UrlGenerated,
    Entities as EntitiesGenerated,
    TextCellView as TextCellViewGenerated,
    ButtonView as ButtonViewGenerated,
    PlasmaButtonView as PlasmaButtonViewGenerated,
    ExtendedImageView as ExtendedImageViewGenerated,
    FlexibleImageView as FlexibleImageViewGenerated,
    Gravity as GravityGenerated,
    MediaGalleryItem as MediaGalleryItemGenerated,
    ImageView as ImageViewGenerated,
    GallerySearchContentItem as GallerySearchContentItemGenerated,
    GalleryMoreButtonItem as GalleryMoreButtonItemGenerated,
    BadgeView as BadgeViewGenerated,
    GreetingGridItem as GreetingGridItemGenerated,
    SimpleLeftView as SimpleLeftViewGenerated,
    RoundButtonView as RoundButtonViewGenerated,
    TagView as TagViewGenerated,
    RightCellArrayView as RightCellArrayViewGenerated,
    HorizontalStackCellView as HorizontalStackCellViewGenerated,
    QRCodeCard as QRCodeCardGenerated,
    DiscoveryCard as DiscoveryCardGenerated,
    WidgetGalleryWithCategories as WidgetGalleryWithCategoriesGenerated,
    WidgetGallery as WidgetGalleryGenerated,
    WidgetNestedContentCard as WidgetNestedContentCardGenerated,
    WidgetButton as WidgetButtonGenerated,
    Button as ButtonGenerated,
    SurfaceColor,
    TextView,
    GridContentWidth,
    Message,
    LocalImageIdentificator,
    CcyToken,
    MoneyToken,
    NumToken,
    HorizontalGravity,
    Typeface,
    IconView,
    Actions,
    ImageAddress,
    RoundedCorners,
    Paddings,
    ScaleMode,
    Color,
    ContentSize,
    ContentWidth,
    ContentHeight,
    VerticalGravity,
    Margins,
    Gradient,
    TypeColor,
    GridContentSize,
    NestedContent,
    CellView,
    RightView,
    Dimension,
} from './generatedSystemMessage';

export {
    SurfaceColor,
    TextView,
    GridContentWidth,
    Message,
    LocalImageIdentificator,
    CcyToken,
    MoneyToken,
    NumToken,
    HorizontalGravity,
    Typeface,
    IconView,
    ImageAddress,
    RoundedCorners,
    Paddings,
    ScaleMode,
    Color,
    ContentSize,
    ContentWidth,
    ContentHeight,
    VerticalGravity,
    Margins,
    Gradient,
    TypeColor,
    GridContentSize,
    NestedContent,
    CellView,
    RightView,
    Dimension,
};

export {
    SystemMessageName,
    AppType,
    PlatformType,
    CharacterId,
    CharacterName,
    PermissionType,
    PermissionStatus,
    CensorClass,
    PhraseEmotions,
    CompositeTokenName,
    ListOfTokenTypesData,
    EmotionId,
    Action,
    Card,
    SimpleCellView,
    Actions,
    GalleryItem,
    IconSizeDimension,
    GridItem,
    LeftView,
    HorizontalCellContentView,
    ObjectObject,
    SimpleList,
    SystemMessage,
    UUID,
    AppInfo,
    Appearance,
    HeaderAppearance,
    Local,
    SecurityAccess,
    Device,
    Features,
    Capabilities,
    Character,
    Strategies,
    Meta,
    Location,
    Time,
    SelectedItem,
    Annotations,
    TimeTimeToken,
    TimeDateToken,
    TimeMonthToken,
    TimeTemporalToken,
    TokenizedElementsList,
    GrammemInfo,
    TokenValue,
    Emotion,
    AssistantCommand,
    SmartAppDataCommand,
    ActionCommand,
    TextAction,
    DeepLinkAction,
    SendContactPhone,
    ServerAction,
    CopyTextAction,
    OpenKeyboard,
    ShareTextAction,
    SmartappTextAction,
    CloseAppCommand,
    PermissionCommand,
    InvoiceCommand,
    SmartAppErrorCommand,
    OperatorCardCommand,
    BubbleCommand,
    Bubble,
    CardCommand,
    CardBase,
    TextAttribute,
    DividerView,
    ButtonCellView,
    MatchParentContentSize,
    FixedContentSize,
    FixedContentWidth,
    MatchParent,
    Columns,
    FixedContentHeight,
    AspectRatio,
    IconSize,
    LeftRightCellView,
    VerticalTextsView,
    FastAnswerLeftView,
    IconAndValueView,
    FlexibleImageLeftRightCellView,
    ImageTextsLeftCellView,
    PlasmaButtonCellView,
    DisclosureRightView,
    DetailRightView,
    InfoAndIconView,
    RoundButtonCellView,
    TagCellView,
    ImageCellView,
    DetailsCellView,
    WeatherCellView,
    WeatherView,
    RightSideCellView,
    FlexibleImageCellView,
    HorizontalCellsView,
    VerticalIconTextView,
    SpacerView,
    WidgetSingleCard,
    WidgetTitleCard,
    WidgetTwoColumns,
    ColumnView,
    NestedContentGallery,
    ImageTextItem,
    NestedContentList,
    LeftRightCellView1,
    WidgetVerticalCards,
    SimpleItem,
    PolicyRunAppComand,
    Suggestions,
    ASRHints,
    Hints,
    Hint,
} from './generatedSystemMessage';

/**
 * Поверхность, от которой приходит вызов ассистента. Например, приложение СберБанк Онлайн или SberBox.
 */
export type Surface = 'SBERBOX' | 'COMPANION' | 'STARGATE' | 'SATELLITE' | 'TIME' | 'SBOL' | 'TV' | 'TV_HUAWEI';

export type ExtendedListCard = ExtendedListCardGenerated & {
    background_color?: SurfaceColor;
};

export type GalleryCard = GalleryCardGenerated & {
    bottom_text?: TextView;
};

export type GridCard = GridCardGenerated & {
    item_width?: GridContentWidth;
};

export type ListCard = ListCardGenerated & {
    background_color?: SurfaceColor;
};

/**
 * Доступные id контекстов для поиска.
 * Например, если задать для какого-то контекста префиксы ('позвони', 'набери'),
 * то ASR будет искать в этом контексте только, если встретит слова 'позвони' или 'набери'.
 * Если задать пустой набор префиксов, то ASR будет искать в этом контексте в любом случае.
 * Таким образом, если мы хотим, чтобы поиск происходил по всем дефолтным префиксам,
 * для значений идентификаторов контекста context_id (mobile_contacts, vk_contacts, vk.fiends)
 * префиксы указывать необязательно.
 */
export type ASRContextsId = 'mobile_contacts' | 'vk_contacts' | 'vk.fiends';

export interface SystemMessagePayload extends SystemMessagePayloadGenerated {
    intent: string;
    message: Message;
}

export interface Url extends Omit<UrlGenerated, 'placeholder'> {
    placeholder?: LocalImageIdentificator;
}

export interface AppState extends AppStateGenerated {
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

export interface Entities extends EntitiesGenerated {
    CCY_TOKEN: CcyToken[];
    MONEY_TOKEN: MoneyToken[];
    NUM_TOKEN: NumToken[];
}

export interface PlasmaButtonView extends Omit<PlasmaButtonViewGenerated, 'actions'> {
    icon?: ImageAddress;
    rounded_corners?: RoundedCorners;
    actions: Actions;
    paddings?: Paddings;
}

export interface TextCellView extends TextCellViewGenerated {
    gravity?: HorizontalGravity;
}

export interface ButtonView extends Omit<ButtonViewGenerated, 'plasma_button' | 'actions'> {
    plasma_button?: PlasmaButtonView;
    typeface?: Typeface;
    actions: Actions;
}

export interface ExtendedImageView extends Omit<ExtendedImageViewGenerated, 'placeholder'> {
    placeholder?: LocalImageIdentificator;
    scale_mode?: ScaleMode;
    placeholder_color?: Color;
}
export interface Gravity extends Omit<GravityGenerated, 'vertical_gravity'> {
    vertical_gravity?: VerticalGravity;
    horizontal_gravity?: HorizontalGravity;
}
export interface FlexibleImageView extends Omit<FlexibleImageViewGenerated, 'placeholder'> {
    placeholder?: LocalImageIdentificator;
    placeholder_color?: Color;
    scale_mode?: ScaleMode;
    gravity?: Gravity;
    size?: ContentSize;
    width?: ContentWidth;
    height?: ContentHeight;
}
export interface MediaGalleryItem extends MediaGalleryItemGenerated {
    margins?: Margins;
}
export interface ImageView extends Omit<ImageViewGenerated, 'placeholder'> {
    placeholder?: LocalImageIdentificator;
    scale_mode?: ScaleMode;
    placeholder_color?: Color;
    size?: GridContentSize;
}

export interface GallerySearchContentItem extends GallerySearchContentItemGenerated {
    paddings?: Paddings;
    width?: GridContentWidth;
}
export interface GalleryMoreButtonItem extends GalleryMoreButtonItemGenerated {
    bottom_text: TextView;
    icon: IconView;
}

export interface BadgeView extends BadgeViewGenerated {
    background?: Gradient;
    text_color?: TypeColor;
    paddings?: Paddings;
}

export interface GreetingGridItem extends GreetingGridItemGenerated {
    paddings?: Paddings;
}

export interface SimpleLeftView extends SimpleLeftViewGenerated {
    title?: TextView;
}

export interface RoundButtonView extends Omit<RoundButtonViewGenerated, 'actions'> {
    icon_tint?: Color;
    background_color?: Color;
    actions: Actions;
}
export interface TagView extends TagViewGenerated {
    background_color?: Color;
}
export interface RightCellArrayView extends RightCellArrayViewGenerated {
    items: RightView[];
}
export interface HorizontalStackCellView extends Omit<HorizontalStackCellViewGenerated, 'alignment'> {
    alignment?: HorizontalGravity;
}
export interface QRCodeCard extends QRCodeCardGenerated {
    size?: GridContentSize;
}
export interface DiscoveryCard extends DiscoveryCardGenerated {
    cells: {
        top_cell?: CellView;
        middle_cell?: CellView;
        bottom_cell?: CellView;
    };
}
export interface WidgetGalleryWithCategories extends WidgetGalleryWithCategoriesGenerated {
    categories_paddings?: Paddings;
}
export interface WidgetGallery extends WidgetGalleryGenerated {
    spacing?: Dimension;
}
export interface WidgetNestedContentCard extends Omit<WidgetNestedContentCardGenerated, 'header'> {
    header?: {
        background_image?: FlexibleImageView;
        header_cell?: CellView;
        height?: ContentHeight;
        actions?: Actions;
        [k: string]: unknown;
    };
    body_cell?: CellView;
    nested_content?: NestedContent;
}

export interface WidgetButton extends Omit<WidgetButtonGenerated, 'actions'> {
    icon?: ImageAddress;
    actions: Actions;
}
export interface Button extends Omit<ButtonGenerated, 'actions'> {
    actions?: Actions;
}
