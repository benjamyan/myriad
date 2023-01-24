import * as React from 'react';
// import Axios from 'axios';
import { Rnd, RndResizeCallback, RndDragCallback } from 'react-rnd' // https://github.com/bokuweb/react-rnd
import ReactMarkdown from 'react-markdown';
import { Loader } from 'myriad-ui';

// import { Loader, Action } from '../../components';
import { applications } from '../../config';
import { ActiveApplication } from '../../types';
import { useApplicationContext, AppContextDispatch, useNavigationContext } from '../../providers';

// import { shadowComponentLoader } from './utils/shadowComponentLoader';
import { reactRndSettings } from './libs';
import { AppWindowMenuBar } from './components'
import './_ApplicationWindow.scss';
import { shadowComponentLoader } from './utils/shadowComponentLoader';
import { ImageViewer } from '../ImageViewer/ImageViewer';
import { ApplicationDataSiloEntry } from '../../providers/ApplicationContext/types';

type ApplicationWindowAdditionalProps = {
    windowVisibility: string;
    // menubarClassName: string;
    rndSettings: ReturnType<typeof reactRndSettings>;
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
let rndSettings: ReturnType<typeof reactRndSettings> = null!;

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
        if (event.target !== interactionRef.close.current 
            && event.target !== interactionRef.maximize.current 
            && event.target !== interactionRef.minimize.current
        ) {
            // console.log('onFocusEventHandler')
            appContextDispatch({
                type:'UPDATE',
                action:['FOCUS'],
                payload: { appId }
            })
        }
    };
    const onResizeEventHandler: RndResizeCallback = (event, dir, ref, delta, pos)=> {
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
        if (event.target === interactionRef.drag.current) {
            // console.log('onDragStopEventHandler')
            appContextDispatch({
                type:'UPDATE',
                payload: {
                    appId,
                    positions: [data.x, data.y]
                }
            })
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
        if (rndSettings === null) {
            rndSettings = reactRndSettings({
                className: WINDOW_CLASSNAME,
                menubarClassName: MENUBAR_CLASSNAME
            })
        }
    }, [])
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
            { ...rndSettings }
            ref={ windowRef }
            key={`ApplicationWindow_${appId}`}
            className={`${props.windowVisibility} ${WINDOW_CLASSNAME} ${props._visibility === 'MINIMIZED' ? 'minimized' : ''} ${props.appId}`}
            bounds='parent'
            onMouseDown={onFocusEventHandler}
            onDragStop={ onDragStopEventHandler }
            onResizeStop={ onResizeEventHandler }
            size={{ 
                width: dimensions[0], 
                height: dimensions[1] 
            }}
            position={{ 
                x: positions[0] as number, 
                y: positions[1] as number
            }}
            style={{ zIndex: props.stackPosition }}>
                <AppWindowMenuBar 
                    appWindowId={ appId }
                    menubarClassName={ MENUBAR_CLASSNAME }
                    displayName={ applicationItem.displayName }
                    interactionRef={interactionRef}
                    windowVisiblity={ props._visibility }
                />
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
        appContextDispatch({
            type: 'SELECT',
            payload: {
                appId: applications.default.badassMf.appId,
                positions: ['middle', 'middle']
            }
        })
        appContextDispatch({
            type: 'SELECT',
            payload: {
                appId: applications.default.aboutMe.appId,
                positions: ['right', 25]
            }
        })
    }, [])

    return React.useMemo(
        ()=> (
            <>
                { appContextState.active.map( (application, index, activeWindows)=> (
                    <ApplicationWindow 
                        { ...application } 
                        key={`DesktopApplicationWindowWrapper_window_${application.appId}`}
                        windowVisibility={ appWindowVisibility(index) }
                        rndSettings={ rndSettings }
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
