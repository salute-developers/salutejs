import { FC, useMemo } from 'react';
import { createGlobalStyle } from 'styled-components';
import { salutejs_sber__dark, salutejs_eva__dark, salutejs_joy__dark } from '@salutejs/plasma-tokens';
import {
    text, // Цвет текста
    background, // Цвет подложки
    gradient, // Градиент
} from '@salutejs/plasma-tokens';
import type { CharacterId } from '@salutejs/client';

const themes = {
    sber: createGlobalStyle(salutejs_eva__dark),
    eva: createGlobalStyle(salutejs_sber__dark),
    joy: createGlobalStyle(salutejs_joy__dark),
};

const DocumentStyle = createGlobalStyle`
    html:root {
        min-height: 100vh;
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
    }
`;

export const GlobalStyles: FC<{ character: CharacterId }> = ({ character }) => {
    const Theme = useMemo(() => themes[character], [character]);
    return (
        <>
            <DocumentStyle />
            <Theme />
        </>
    );
};
