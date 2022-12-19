import * as React from 'react';
import { Rnd, RndResizeCallback, RndDragCallback } from 'react-rnd' // https://github.com/bokuweb/react-rnd
import ReactMarkdown from 'react-markdown';

import { Scrollbar } from '../../components';
import { applications } from '../../config';
import { ActiveApplication } from '../../types';
import { useApplicationContext, AppContextDispatch } from '../../providers';

import { shadowComponentLoader } from './utils/shadowComponentLoader';
import { reactRndSettings } from './libs';
import { AppWindowMenuBar } from './components'
import './_ApplicationWindow.scss';

type ApplicationWindowAdditionalProps = {
    windowClassname: string;
    menubarClassname: string;
    rndSettings: ReturnType<typeof reactRndSettings>;
    activeApplications: ActiveApplication[];
    appContextDispatch: AppContextDispatch;
} 

export const ApplicationWindow = (props: ActiveApplication & ApplicationWindowAdditionalProps) => {
    const { 
        appId, 
        positions, 
        dimensions, 
        windowClassname, 
        menubarClassname, 
        rndSettings,
        activeApplications,
        appContextDispatch
    } = props;
    const applicationItem = applications.appItemsById[appId];

    const [ appState, setAppState ] = React.useState<'INIT' | 'LOAD' | 'COMPLETE' | 'ERR'>('INIT');
    const appContent = React.useRef<string>();
    // const tempRef = React.useRef<any>(null);
    // const unmountRef = React.useRef<any>(null);
    const mountRef = React.useRef<any>(null);
        
    const onFocusEventHandler = ()=> {
        appContextDispatch({
            type:'FOCUS',
            payload: appId
        })
    };
    const onResizeEventHandler: RndResizeCallback = (event, dir, ref, delta, pos)=> {
        // const convertToPixel = (dimension: string)=> {
        //     dimension.indexOf('%') > 0
        //         ? 
        //         : parseInt(dimension)
        // }
        appContextDispatch({
            type:'UPDATE',
            payload: {
                appId,
                // dimensions: [ 
                //     convertToPixel(ref.style.width), 
                //     convertToPixel(ref.style.height)
                // ]
                dimensions: [ 
                    parseInt(ref.style.width), 
                    parseInt(ref.style.height)
                ]
            }
        })
    };
    const onDragStopEventHandler: RndDragCallback = (event, data)=> {
        appContextDispatch({
            type:'UPDATE',
            payload: {
                appId,
                positions: [data.x, data.y]
            }
        })
    };
    
    const appStackPosition = React.useMemo(
        ()=> (
            activeApplications[0].appId === applicationItem.appId ? '2' : '1'
        ),
        [ activeApplications ]
    );
    const AppWindowArticleContent = React.useCallback(
        ()=>{
            switch(appState) {
                case 'INIT': {
                    return <p>Init...</p>
                }
                case 'LOAD': {
                    return <p>Loading...</p>
                }
                case 'COMPLETE': {
                    // console.log(mountRef.current);
                    switch(applicationItem.sourceType) {
                        case 'HTML': {
                            // const parsedHTML = new DOMParser().parseFromString(html, "text/html");
                            // mountRef.current = shadowComponentLoader({
                            //     html: parsedHTML,
                            //     className: props.windowClassname
                            // })
                            
                            // if (/*!!customElements.get(givenId) && */mountRef.current !== null) {
                            //     setAppState('COMPLETE')
                            //     return
                            // }
                            return <>{ JSON.stringify(mountRef.current) }</>;
                            // break;
                        }
                        case 'MD': {
                            return <ReactMarkdown>{ appContent.current as string }</ReactMarkdown>
                        }
                        case 'JSON': {
                            return <>{ mountRef.current }</>
                            // break;
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
        (async function() {
            try {
                const appDefinition = applicationItem;
                if (appDefinition !== undefined && appDefinition.sourceUrl !== undefined && appDefinition.sourceUrl.length > 0) {
                    setAppState('LOAD')
                    await fetch(appDefinition.sourceUrl)
                        .then(res=> res.text() )
                        .then((res)=> {
                            appContent.current = res;

                            // switch(applicationItem.sourceType) {
                            //     case 'HTML': {
                                    
                            //         break;
                            //     }
                            //     case 'MD': {
                            //         return <ReactMarkdown>{ appContent.current as string }</ReactMarkdown>
                            //     }
                            //     case 'JSON': {
                            //         return <>{ mountRef.current }</>
                            //         break;
                            //     }
                            //     default: {
                            //         throw new Error(`Failed mounting custom component in ${appDefinition.appId}`)
                            //     }
                            // }


                            // const parsedHTML = new DOMParser().parseFromString(html, "text/html");
                            // mountRef.current = shadowComponentLoader({
                            //     html: parsedHTML,
                            //     className: props.windowClassname
                            // })
                            
                            // if (/*!!customElements.get(givenId) && */mountRef.current !== null) {
                                setAppState('COMPLETE')
                            //     return
                            // }
                            // throw new Error(`Failed mounting custom component in ${appDefinition.appId}`)
                        })
                        .catch(err=>{
                            console.error(err)
                            setAppState('ERR')
                        });
                } else if (appDefinition.sourceContent !== undefined) {
                    // console.log(appDefinition.sourceContent)
                    appContent.current = JSON.stringify(appDefinition.sourceContent);
                    setAppState('COMPLETE');
                } else {
                    setAppState('ERR');
                }
            } catch (err) {
                setAppState('ERR')
                console.log(err)
            }
        })();
    }, [])
    
    return (
        <Rnd
            { ...rndSettings }
            key={`ApplicationWindow_${appId}`}
            onClick={ onFocusEventHandler }
            onDragStart={ onFocusEventHandler }
            onDragStop={ onDragStopEventHandler }
            onResizeStart={ onFocusEventHandler }
            onResizeStop={ onResizeEventHandler }
            size={{ 
                width: dimensions[0], 
                height: dimensions[1] 
            }}
            position={{ 
                x: positions[0], 
                y: positions[1] 
            }}
            style={{ zIndex: appStackPosition }}>
                <AppWindowMenuBar 
                    appWindowId={ appId }
                    className={ windowClassname }
                    menubarClassname={ menubarClassname }
                    displayName={ applicationItem.displayName }
                    mountNode={ mountRef.current }
                    appNode={mountRef.current}
                />
                <div className={ `${windowClassname}--content` }>
                    <article className={`${windowClassname}--content-article`}>
                        <AppWindowArticleContent />
                    </article>
                    {/* <Scrollbar 
                        direction='VERTICAL'
                        givenClass={`${windowClassname}--scroll ${windowClassname}--scroll-x`}
                    /> */}
                    <Scrollbar 
                        direction='HORIZONTAL' 
                        givenClass={`${windowClassname}--scroll ${windowClassname}--scroll-x`} 
                    />
                </div>
        </Rnd>
    )
}

export const DesktopApplicationWindowWrapper = ()=> {
    const { appContextState, appContextDispatch } = useApplicationContext();

    // so we can have dynaic classnames
    const appWindowClassname: string = 'app__window';
    // this is being used in both rnd and an external component - keep it here so it can be referenced
    const menubarClassname: string = `${appWindowClassname}--menubar`;
    // invoke out rnd settings on component mount, pass them down on each instance
    const rndSettings = reactRndSettings({
            className: appWindowClassname,
            menubarClassname
        });

    return React.useMemo(
        ()=> (
            <>
                { appContextState.active.map( (application)=> (
                    <ApplicationWindow 
                        { ...application } 
                        windowClassname={ appWindowClassname }
                        menubarClassname={ menubarClassname }
                        rndSettings={ rndSettings }
                        activeApplications={ appContextState.active }
                        appContextDispatch={ appContextDispatch }
                    />
                )) }
            </>
        ),
        [ appContextState.active ]
    )
}
