import * as React from 'react';
import { Rnd, RndResizeCallback, RndDragCallback } from 'react-rnd' // https://github.com/bokuweb/react-rnd
import ReactMarkdown from 'react-markdown';
import { Loader } from 'myriad-ui';

import { applications } from '../../config';
import { ActiveApplication } from '../../types';
import { useApplicationContext, AppContextDispatch, useNavigationContext } from '../../providers';

import { reactRndSettings } from './libs';
import { shadowComponentLoader } from './utils/shadowComponentLoader';
import { ImageViewer } from '../ImageViewer/ImageViewer';
import { ApplicationDataSiloEntry } from '../../providers/ApplicationContext/types';

import './_ApplicationWindow.scss';

type ApplicationWindowAdditionalProps = {
    windowVisibility: string;
    // menubarClassName: string;
    // rndSettings: ReturnType<typeof reactRndSettings>;
    stackPosition: number;
    appDataBuckerContent: ApplicationDataSiloEntry | undefined;
    appContextDispatch: AppContextDispatch;
} 
export type IconRef = {
    close: React.RefObject<HTMLElement>;
    minimize: React.RefObject<HTMLElement>;
    maximize: React.RefObject<HTMLElement>;
    drag: React.RefObject<HTMLDivElement>;
};

// so we can have dynaic classnames
const WINDOW_CLASSNAME = 'app__window';
// this is being used in both rnd and an external component - keep it global
const MENUBAR_CLASSNAME = `${WINDOW_CLASSNAME}--menubar`;
// invoke rnd settings on component mount, pass them down on each instance
// let rndSettings: ReturnType<typeof reactRndSettings> = null!;

const ApplicationWindow = (props: ActiveApplication & ApplicationWindowAdditionalProps) => {
    const { 
        _ready,
        appId, 
        positions, 
        dimensions, 
        appContextDispatch
    } = props;
    const applicationItem = applications.appItemsById[appId];

    const [ appState, setAppState ] = React.useState<'INIT' | 'LOAD' | 'COMPLETE' | 'ERR'>('INIT');
    
    const windowRef = React.useRef<any>(null);
    const appContent = React.useRef<Error | JSON | string>();
    const mountRef = React.useRef<any>(null);
    const interactionRef: IconRef = {
        close: React.useRef(null),
        minimize: React.useRef(null),
        maximize: React.useRef(null),
        drag: React.useRef(null)
    };

    const onFocusEventHandler = (event: MouseEvent)=> {
        // console.log('onFocusEventHandler')
        if (event.target !== interactionRef.close.current 
            && event.target !== interactionRef.maximize.current 
            && event.target !== interactionRef.minimize.current
        ) {
            appContextDispatch({
                type:'UPDATE',
                action:['FOCUS'],
                payload: { appId }
            })
        }
    };
    const onResizeEventHandler: RndResizeCallback = (_event, _dir, ref, _delta, _pos)=> {
        // console.log('onResizeEventHandler')
        appContextDispatch({
            type:'UPDATE',
            payload: {
                appId,
                dimensions: [ref.style.width, ref.style.height]
            }
        })
    };
    const onDragStopEventHandler: RndDragCallback = (event, data)=> {
        // console.log('onDragStopEventHandler')
        if (event.target === interactionRef.drag.current && data !== undefined) {
            appContextDispatch({
                type:'UPDATE',
                payload: {
                    appId,
                    positions: [data.x, data.y]
                }
            })
        }
    };
    const onMenuBarIconClickHandler = (event: React.MouseEvent | React.TouchEvent, action: 'CLOSE' | 'MINIMIZE' | 'MAXIMIZE')=> {
        console.log('onMenuBarIconClickHandler')
        // console.log(event.type)
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        // @ts-expect-error
        if (event.button !== undefined && event.button !== 0) return;
        switch (action) {
            case 'CLOSE': {
                console.log('onMenuBarIconClickHandler CLOSE')
                appContextDispatch({
                    type:'REMOVE',
                    payload: appId
                });
                break;
            }
            case 'MAXIMIZE': {
                console.log('onMenuBarIconClickHandler MAXIMIZE')
                appContextDispatch({
                    type:'UPDATE',
                    action: ['MAXIMIZE','FOCUS'],
                    payload: {
                        appId
                    }
                })
                break;
            }
            case 'MINIMIZE': {
                console.log('onMenuBarIconClickHandler MINIMIZE')
                appContextDispatch({
                    type:'UPDATE',
                    action: ['MINIMIZE'],
                    payload: {
                        appId
                    }
                })
                break;
            }
            default: {
                console.error('Unhandled menu bar action')
            }
        }
    };
    const AppWindowArticleContent = React.useCallback(
        ()=>{
            switch(appState) {
                case 'INIT':
                case 'LOAD': {
                    return <Loader.Hourglass />
                }
                case 'COMPLETE': {
                    switch(applicationItem.sourceType) {
                        case 'HTML': {
                            // const parsedHTML = new DOMParser().parseFromString(html, "text/html");
                            if (mountRef.current === null) {
                                mountRef.current = shadowComponentLoader({
                                    html: new DOMParser().parseFromString(appContent.current as string, "text/html"),
                                    className: WINDOW_CLASSNAME,
                                    refHandler: mountRef.current
                                })
                            }
                            return <>{ mountRef.current }</>;
                        }
                        case 'MEDIA': {
                            if (!!applicationItem.renderContent) {
                                return <>{ applicationItem.renderContent({ content: appContent.current as JSON }) }</>
                            }
                            return <ImageViewer content={ appContent.current as string } options={{ windowRef }} />;
                        }
                        case 'MD': {
                            if (!!applicationItem.renderContent) {
                                return <>{ applicationItem.renderContent({ content: appContent.current as string }) }</>
                            }
                            return <ReactMarkdown>{ appContent.current as string }</ReactMarkdown>
                        }
                        case 'JSON': {
                            if (!!applicationItem.renderContent) {
                                return <>{ applicationItem.renderContent({ content: appContent.current as JSON }) }</>
                            }
                            return <>{ mountRef.current }</>;
                        }
                        default: {
                            return <>An unexpenceter error occured.</>
                        }
                    }
                    // return <>{ mountRef.current }</>
                }
                case 'ERR':
                default: {
                    return <h5>Oops!</h5>
                }
            }
        },
        [ appState ]
    );
    
    React.useEffect(()=>{
        if (_ready === false) {
            setAppState('LOAD')
        } else if (_ready instanceof Error) {
            setAppState('ERR')
        } else {
            appContent.current = props.appDataBuckerContent;
            setAppState('COMPLETE')
        }
    }, [ _ready ])
    
    return (
        <Rnd
            { ...reactRndSettings({
                className: WINDOW_CLASSNAME,
                menubarClassName: MENUBAR_CLASSNAME + '-bg'
            }) }
            ref={ windowRef }
            key={`ApplicationWindow_${appId}`}
            className={`${props.windowVisibility} ${WINDOW_CLASSNAME} ${props._visibility === 'MINIMIZED' ? 'minimized' : ''} ${props.appId}`}
            bounds='parent'
            onMouseDown={ onFocusEventHandler }
            onDragStop={ onDragStopEventHandler }
            onResizeStop={ onResizeEventHandler }
            dragHandleClassName={ MENUBAR_CLASSNAME }
            size={{ 
                width: dimensions[0], 
                height: dimensions[1] 
            }}
            position={{
                x: positions[0] as number, 
                y: positions[1] as number 
            }}
            style={{ zIndex: props.stackPosition }}>
                <nav className={ MENUBAR_CLASSNAME }>
                    <i 
                        ref={ interactionRef.close } 
                        className={`${MENUBAR_CLASSNAME}-icon close`} 
                        onMouseDown={ (event)=> onMenuBarIconClickHandler(event, 'CLOSE') }
                        onTouchEnd={ (event)=> onMenuBarIconClickHandler(event, 'CLOSE') }
                    />
                    <p className={`${MENUBAR_CLASSNAME}-title`}>{applicationItem.displayName}</p>
                    <div className={`${MENUBAR_CLASSNAME}-icon_wrapper`}>
                        <i 
                            ref={ interactionRef.maximize } 
                            className={`${MENUBAR_CLASSNAME}-icon ${applicationItem.displayName === 'MAXIMIZED' ? 'revert' : 'maximize'}`} 
                            onMouseDown={ (event)=> onMenuBarIconClickHandler(event, 'MAXIMIZE') }
                            onTouchEnd={ (event)=> onMenuBarIconClickHandler(event, 'MAXIMIZE') }
                        />
                        <i 
                            ref={ interactionRef.minimize } 
                            // children={['-']}
                            className={`${MENUBAR_CLASSNAME}-icon minimize`} 
                            onMouseDown={ (event)=> onMenuBarIconClickHandler(event, 'MINIMIZE') } 
                            onTouchEnd={ (event)=> onMenuBarIconClickHandler(event, 'MINIMIZE') }
                        />
                    </div>
                    <div ref={interactionRef.drag} className={`${MENUBAR_CLASSNAME}-bg`} />
                </nav>
                <div className={ `${WINDOW_CLASSNAME}--content` }>
                    <article className={`${WINDOW_CLASSNAME}--content-article ${appId}`}>
                        <div className={`article__wrapper article__wrapper--${applicationItem.sourceType.toLowerCase()}`}>
                            <AppWindowArticleContent />
                        </div>
                    </article>
                </div>
        </Rnd>
    )
}

export const ApplicationWrapper = ()=> {
    const { navContextState } = useNavigationContext();
    const { appContextState, appContextDispatch } = useApplicationContext();
    
    const appWindowVisibility = React.useCallback(
        (appIndex: number)=> {
            if (navContextState.id.length > 0) {
                return ''
            } else if (appIndex === 0) {
                return 'focused'
            } else {
                return ''
            }
        },
        [ navContextState.id ]
    );

    React.useEffect(()=>{
        /** TODO dont dispatch applications here */
        // appContextDispatch({
        //     type: 'SELECT',
        //     payload: {
        //         appId: applications.default.badassMf.appId
        //     }
        // });
        appContextDispatch({
            type: 'SELECT',
            payload: {
                appId: applications.default.aboutMe.appId
            }
        });
    }, [])
    
    return React.useMemo(
        ()=> (
            <>
                { appContextState.active.map( (application, index, activeWindows)=> (
                    <ApplicationWindow 
                        { ...application } 
                        key={`DesktopApplicationWindowWrapper_window_${application.appId}`}
                        windowVisibility={ appWindowVisibility(index) }
                        stackPosition={ activeWindows.length - index }
                        appDataBuckerContent={ appContextState.bucket.current.get(application.appId) }
                        appContextDispatch={ appContextDispatch }
                    />
                )) }
            </>
        ),
        [ appContextState.active, navContextState.id ]
    )
}
