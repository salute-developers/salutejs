import { FC, useMemo } from 'react';
import { createGlobalStyle } from 'styled-components';
import type { CharacterId } from '@salutejs/client';
import { darkJoy, darkEva, darkSber } from '@salutejs/plasma-tokens/themes';
import { text, background, gradient } from '@salutejs/plasma-tokens';

const themes = {
    sber: createGlobalStyle(darkEva),
    eva: createGlobalStyle(darkSber),
    joy: createGlobalStyle(darkJoy),
};

const DocStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent; /* i.e. Nexus5/Chrome and Kindle Fire HD 7'' */
  }
  html {
    font-size: 32px;
    user-select: none;
  }
  body {
    font-family: "SB Sans Text", sans-serif;
    height: auto;
    min-height: 100%;
  }
  body:before {
    content: "";
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: ${text};
    background: ${gradient};
    background-color: ${background};
    background-attachment: fixed;
    background-size: 100vw 100vh;
    z-index: -2;
  }
`;

export const GlobalStyles: FC<{ character: CharacterId }> = ({ character }) => {
    const Theme = useMemo(() => themes[character], [character]);

    return (
        <>
            <Theme />
            <DocStyles />
        </>
    );
};
