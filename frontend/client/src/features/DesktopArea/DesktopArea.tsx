import React from 'react';
import { Button } from 'myriad-ui';

import { navigation } from '../../config';
import { useApplicationContext } from '../../providers';
import { ApplicationDefinition } from '../../types';
import "./_DesktopArea.scss";

// https://blog.logrocket.com/drag-and-drop-react-dnd/
const DesktopIcons = (props: { desktopRef: React.RefObject<HTMLElement> })=> {
    const { appContextState, appContextDispatch } = useApplicationContext();
    const [ lastSelected, setLastSelected ] = React.useState<string | null>(null);

    const appIsActiveInContext = React.useCallback(
        (givenAppId: ApplicationDefinition['appId'])=> {
            return appContextState.active.some(({ appId })=> appId === givenAppId)
        },
        [ appContextState.active ]
    );

    React.useEffect(()=>{
        if (!!props.desktopRef.current) {
            props.desktopRef.current.addEventListener('click', (event)=>{
                if (event.target === props.desktopRef.current) {
                    setLastSelected(null)
                }
            })
        }
    }, [])
    
    return (
        <>
            {   Object.values(navigation.desktopItems).map(({ appId, ...desktopItem }, i)=>{
                    if (appId !== undefined) {
                        return (
                            <Button.IconButton 
                                key={`DesktopArea_icon${i}`}
                                icon={ desktopItem.icon || '' }
                                size='MD'
                                className={`desktop__icon ${lastSelected === appId ? 'active' : ''}`}
                                textContent={ desktopItem.displayName }
                                textTag='p'
                                onSingleClick={(event)=>{
                                    event.stopPropagation();
                                    event.nativeEvent.stopImmediatePropagation();

                                    setLastSelected(appId);
                                    if (appIsActiveInContext(appId)) {
                                        appContextDispatch({
                                            type: 'UPDATE',
                                            // action: ['TOGGLE','FOCUS'],
                                            action: ['FOCUS'],
                                            payload: { appId }
                                        })
                                    } else {
                                        appContextDispatch({
                                            type: 'SELECT',
                                            payload: appId
                                        })
                                    }
                                }}
                            />
                        )
                    }
                    return null;
                })
            }
        </>
    )
}

export const DesktopArea = ()=> {
    const desktopRef = React.useRef<HTMLElement>(null);

    return (
        <section className='desktop' ref={ desktopRef }>
            <DesktopIcons desktopRef={ desktopRef } />
        </section>
    )
}
