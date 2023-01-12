import * as React from 'react';

import { useApplicationContext } from '../../../providers';
import { IconRef } from '../ApplicationWindow';

export type MenuBarProps = {
    /** The title to be displayed on client */
    displayName: string;
    /** App window ID under its context value */
    appWindowId: string;
    /** Menubar classname thats used in multiple places externally
     * @important needs to follow BEM methodology and end with the menubars name for extension
     */
    menubarClassName: string;
    
    interactionRef: IconRef;
}

export const AppWindowMenuBar = (props: MenuBarProps) => {
    const { appContextDispatch } = useApplicationContext();
    const { menubarClassName, interactionRef } = props;

    const onMenuBarIconClickHandler = (event: React.MouseEvent, action: 'CLOSE' | 'MINIMIZE' | 'MAXIMIZE')=> {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

        if (event.button !== 0) return;
        switch (action) {
            case 'CLOSE': {
                // console.log('onMenuBarIconClickHandler CLOSE')
                appContextDispatch({
                    type:'REMOVE',
                    payload: props.appWindowId
                });
                break;
            }
            case 'MAXIMIZE': {
                // console.log('onMenuBarIconClickHandler MAXIMIZE')
                appContextDispatch({
                    type:'UPDATE',
                    action: ['MAXIMIZE','FOCUS'],
                    payload: {
                        appId: props.appWindowId,
                        // dimensions: ['100%','100%'],
                        // positions:[0,0]
                    }
                })
                break;
            }
            case 'MINIMIZE': {
                // console.log('onMenuBarIconClickHandler MINIMIZE')
                appContextDispatch({
                    type:'UPDATE',
                    action: ['MINIMIZE'],
                    payload: {
                        appId: props.appWindowId,
                        // isVisible: false
                    }
                })
                break;
            }
            default: {
                console.error('Unhandled menu bar action')
            }
        }
    };

    return (
        <nav className={ menubarClassName }>
            <i ref={ interactionRef.close } className={`${menubarClassName}-icon close`} onMouseDown={ (event)=> onMenuBarIconClickHandler(event, 'CLOSE') } />
            <p className={`${menubarClassName}-title`}>{props.displayName}</p>
            <div className={`${menubarClassName}-icon_wrapper`}>
                <i ref={ interactionRef.maximize } className={`${menubarClassName}-icon maximize`} onMouseDown={ (event)=> onMenuBarIconClickHandler(event, 'MAXIMIZE') } />
                <i ref={ interactionRef.minimize } className={`${menubarClassName}-icon minimize`} onMouseDown={ (event)=> onMenuBarIconClickHandler(event, 'MINIMIZE') } />
            </div>
            <div ref={interactionRef.drag} className={`${menubarClassName}-bg`} />
        </nav>
    )
}

