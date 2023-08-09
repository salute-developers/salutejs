import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Container, DeviceThemeProvider } from '@salutejs/plasma-ui';
import {
    CharacterId,
    AssistantAppState,
    AssistantNavigationCommand,
    createAssistant,
    AssistantClientCommand,
} from '@salutejs/client';

import { GlobalStyles } from '../Components/GlobalStyles';
import { useScenario } from '../hooks/useScenario';

const IndexPage = () => {
    const [character, setCharacter] = useState<CharacterId>('sber' as const);

    const assistantStateRef = useRef<AssistantAppState>({});
    const assistantRef = useRef<ReturnType<typeof createAssistant>>();

    useScenario();

    useEffect(() => {
        const initializeAssistant = () => {
            return createAssistant({
                getState: () => assistantStateRef.current,
            });
        };

        const assistant = initializeAssistant();

        assistant.on('data', (command: AssistantClientCommand) => {
            let navigation: AssistantNavigationCommand['navigation'];
            switch (command.type) {
                case 'character':
                    setCharacter(command.character.id);
                    // 'sber' | 'eva' | 'joy';
                    break;
                case 'navigation':
                    navigation = (command as AssistantNavigationCommand).navigation;
                    break;
                case 'smart_app_data':
                    // dispatch(command.smart_app_data);
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

        assistantRef.current = assistant;
    }, []);

    return (
        <DeviceThemeProvider>
            <GlobalStyles character={character} />
            <Container style={{ margin: '5rem 0 7rem' }}></Container>
        </DeviceThemeProvider>
    );
};

export default dynamic(() => Promise.resolve(IndexPage), {
    ssr: false
  })
