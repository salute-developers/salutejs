import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AssistantClientCommand, AssistantNavigationCommand, CharacterId } from '@salutejs/client';
import { DeviceThemeProvider } from '@salutejs/plasma-ui';

import { assistantInstance } from '../utils/assistant';
import { GlobalStyles } from '../Components/GlobalStyles';

if (process.browser) {
    // @ts-ignore
    import('@sberdevices/spatial-navigation');
}

function CustomApp({ Component, pageProps }: AppProps) {
    const [character, setCharacter] = useState<CharacterId>('sber' as const);

    useEffect(() => {
        return assistantInstance?.on('data', (command: AssistantClientCommand) => {
            let navigation: AssistantNavigationCommand['navigation'];
            switch (command.type) {
                case 'character':
                    setCharacter(command.character.id);
                    // 'sber' | 'eva' | 'joy';
                    break;
                case 'navigation':
                    navigation = (command as AssistantNavigationCommand).navigation;
                    break;
                default:
                    break;
            }

            if (navigation) {
                switch (navigation.command) {
                    case 'UP':
                        window.scrollTo(0, window.scrollY - 500);
                        break;
                    case 'DOWN':
                        window.scrollTo(0, window.scrollY + 500);
                        break;
                    default:
                        break;
                }
            }
        });
    }, []);

    return (
        <>
            <Head>
                <title>Твой Canvas</title>
                <meta name="description" content="Твой Canvas" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DeviceThemeProvider>
                <GlobalStyles character={character} />
                <Component {...pageProps} />
            </DeviceThemeProvider>
        </>
    );
}

export default CustomApp;
