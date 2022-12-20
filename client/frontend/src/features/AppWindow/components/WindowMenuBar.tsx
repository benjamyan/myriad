import ReactDOM from 'react-dom';
import * as React from 'react';

import { useApplicationContext } from '../../../providers';

export type MenuBarProps = {
    /** Given classname for our application window */
    className: string;
    /** The title to be displayed on client */
    displayName: string;
    /** App window ID under its context value */
    appWindowId: string;
    /** Menubar classname thats used in multiple places externally */
    menubarClassname: string;
    /** The mounted nodes parent for removal from the vDOM */
    mountNode: Element | DocumentFragment;

    appNode: any;
}

export const AppWindowMenuBar = (props: MenuBarProps) => {
    const { appContextDispatch } = useApplicationContext();

    const onMenuBarIconClickHandler = (event: React.MouseEvent, action: 'CLOSE' | 'MINIMIZE' | 'MAXIMIZE')=> {
        event.stopPropagation();
        switch (action) {
            case 'CLOSE': {
                // ReactDOM.unmountComponentAtNode(props.mountNode.firstElementChild as Element);
                appContextDispatch({
                    type:'REMOVE',
                    payload: props.appWindowId
                });
                break;
            }
            case 'MAXIMIZE': {
                appContextDispatch({
                    type:'MAXIMIZE',
                    payload: props.appWindowId
                })
                break;
            }
            case 'MINIMIZE': {
                appContextDispatch({
                    type:'MINIMIZE',
                    payload: props.appWindowId
                })
                break;
            }
            default: {
                console.error('Unhandled menu bar action')
            }
        }
    };

    return (
        <nav className={ props.menubarClassname }>
            <i onClick={ (event)=> onMenuBarIconClickHandler(event, 'CLOSE') } />
            <p>{props.displayName}</p>
            <div>
                <i onClick={ (event)=> onMenuBarIconClickHandler(event, 'MAXIMIZE') } />
                <i onClick={ (event)=> onMenuBarIconClickHandler(event, 'MINIMIZE') } />
            </div>
        </nav>
    )
}

