import * as React from 'react';
import { Rnd, RndResizeCallback, RndDragCallback } from 'react-rnd' // https://github.com/bokuweb/react-rnd

import { Scrollbar } from '../../components';
import { applications } from '../../config';
import { reactRnd } from '../../libs'
import { ActiveApplication } from '../../types';
import { useApplicationContext } from '../../providers';
import './_ApplicationWindow.scss';
import ReactDOM from 'react-dom';

const { appItemsById } = applications;
const applicationWindowClassName: string = 'app__window';
const _appWindowClasses = {
    section: applicationWindowClassName,
    menu: `${applicationWindowClassName}--menubar`,
    wrapper: `${applicationWindowClassName}--content`,
    article: `${applicationWindowClassName}--content-article`,
    articleInner: `${applicationWindowClassName}--content-article-inner`,
    scrollX: `${applicationWindowClassName}--scroll ${applicationWindowClassName}--scroll-x`,
    scrollY: `${applicationWindowClassName}--scroll ${applicationWindowClassName}--scroll-y`,
    xResize: `${applicationWindowClassName}--resize-x`,
    yResize: `${applicationWindowClassName}--resize-y`,
    bothResize: `${applicationWindowClassName}--resize-both`
}

export const ApplicationWindow = (appProps: AppWindowProps) => {
    const {
        appContextItem,
        appContextItem: { positions, dimensions }
    } = appProps;
    const { appContextState, appContextDispatch } = useApplicationContext();
    const applicationItem = appItemsById[appContextItem.appId];

    const [ appState, setAppState ] = React.useState<'INIT' | 'LOAD' | 'COMPLETE' | 'ERR'>('INIT');
    const unmountRef = React.useRef<any>(null);
    const mountRef = React.useRef<any>(null);

    const onMenuBarIconClickHandler = (event: React.MouseEvent, action: 'CLOSE' | 'MINIMIZE' | 'MAXIMIZE')=> {
        event.stopPropagation();
        switch (action) {
            case 'CLOSE': {
                console.log(mountRef)
                console.log(unmountRef)
                ReactDOM.unmountComponentAtNode(mountRef.current);
                // appContextDispatch({
                //     type:'REMOVE',
                //     payload: applicationItem.appId
                // });
                break;
            }
            case 'MAXIMIZE': {
                appContextDispatch({
                    type:'MAXIMIZE',
                    payload: applicationItem.appId
                })
                break;
            }
            case 'MINIMIZE': {
                appContextDispatch({
                    type:'MINIMIZE',
                    payload: applicationItem.appId
                })
                break;
            }
            default: {
                console.error('Unhandled menu bar action')
            }
        }
    };
    const onFocusEventHandler = ()=> {
        appContextDispatch({
            type:'FOCUS',
            payload: appContextItem.appId
        })
    };
    const onResizeEventHandler: RndResizeCallback = (event, dir, ref, delta, pos)=> {
        appContextDispatch({
            type:'UPDATE',
            payload: {
                appId: appContextItem.appId,
                dimensions: [ parseInt(ref.style.width), parseInt(ref.style.height) ]
            }
        })
    };
    const onDragStopEventHandler: RndDragCallback = (event, data)=> {
        appContextDispatch({
            type:'UPDATE',
            payload: {
                appId: appContextItem.appId,
                positions: [data.x, data.y]
            }
        })
    };
    
    const appStackPosition = React.useMemo(
        ()=> (
            appContextState.active[0].appId === applicationItem.appId ? '2' : '1'
        ),
        [ appContextState.active ]
    );
    
    React.useEffect(()=>{
        (async function() {
            try {
                const appDefinition = applicationItem;
                if (appDefinition !== undefined && appDefinition.sourceUrl !== undefined && appDefinition.sourceUrl.length > 0) {
                    setAppState('LOAD')
                    await fetch(appDefinition.sourceUrl)
                        .then(res=> res.text() )
                        .then((html)=> {
                            /** Load the HTML */
                            const parsedHTML = new DOMParser().parseFromString(html, "text/html");

                            const style = parsedHTML.getElementsByTagName('style')[0];
                            const component = parsedHTML.getElementsByTagName('section')[0];
                            const script = parsedHTML.getElementsByTagName('script')[0];
                            
                            const givenId = component.id;
                            mountRef.current = React.createElement(
                                givenId, 
                                { 
                                    ref: unmountRef.current, 
                                    class: _appWindowClasses.articleInner,
                                    onCompositionEnd() {
                                        console.log('end')
                                    },
                                    onCompositionStart() {
                                        console.log('start')
                                    },
                                    onCompositionUpdate() {
                                        console.log('update')
                                    },
                                    componentWillMount() {
                                        console.log('mounted')
                                    },
                                    componentDidUnmount() {
                                        console.log('unmount')
                                    }
                                }
                            );
                            class CustomWebComponent extends HTMLElement {
                                constructor() {
                                    super();
                                }
                                connectedCallback() {
                                    if (this.isConnected) {
                                        this.attachShadow({ mode: 'open' });
                                        if (!!style) {
                                            this.shadowRoot?.appendChild(style);
                                        };
                                        if (!!component) {
                                            this.shadowRoot?.appendChild(component);
                                        };
                                        if (!!script) {
                                            /** Mount the script */
                                            this.shadowRoot?.appendChild(script);
                                            /** Eval on the script */
                                            window.eval(this.shadowRoot?.querySelector('script')?.innerText || '');
                                        };
                                        console.log(-1)
                                    } else {
                                        console.log(0)
                                    }
                                }
                                adoptedCallback() {
                                    console.log(99)
                                }
                                disconnectCallback() {
                                    console.log(1)
                                    if (!this.isConnected) {
                                        console.log(2)
                                    }
                                }
                            }
                            if (!customElements.get(givenId)) {
                                customElements.define(givenId, CustomWebComponent);
                            }
                            if (!!customElements.get(givenId) && mountRef.current !== null) {
                                setAppState('COMPLETE')
                                return
                            }
                            throw new Error(`Failed mounting custom component ${givenId} in ${appDefinition.appId}`)
                        })
                        .catch(err=>{
                            console.error(err)
                            setAppState('ERR')
                        });
                } else {
                    setAppState('COMPLETE')
                }
            } catch (err) {
                console.log(err)
                setAppState('ERR')
            }
        })();
    }, [])

    return (
        <Rnd
            as='section'
            className={_appWindowClasses.section}
            onClick={ onFocusEventHandler }
            dragHandleClassName={_appWindowClasses.menu}
            onDragStart={ onFocusEventHandler }
            onDragStop={ onDragStopEventHandler }
            enableResizing={{ 
                top:false, 
                right:true, 
                bottom:true, 
                left:false, 
                topRight:false, 
                bottomRight:true, 
                bottomLeft:false, 
                topLeft:false 
            }}
            resizeHandleClasses={{
                right: _appWindowClasses.xResize,
                bottom: _appWindowClasses.yResize,
                bottomRight: _appWindowClasses.bothResize
            }}
            onResizeStart={ onFocusEventHandler }
            onResizeStop={ onResizeEventHandler }
            size={{ width: dimensions[0], height: dimensions[1] }}
            position={{ x: positions[0], y: positions[1], }}
            style={{ zIndex: appStackPosition }}>
                <nav className={ _appWindowClasses.menu }>
                    <i onClick={ (event)=> onMenuBarIconClickHandler(event, 'CLOSE') } />
                    <p>{applicationItem.displayName}</p>
                    <div>
                        <i onClick={ (event)=> onMenuBarIconClickHandler(event, 'MAXIMIZE') } />
                        <i onClick={ (event)=> onMenuBarIconClickHandler(event, 'MINIMIZE') } />
                    </div>
                </nav>
                <div className={ _appWindowClasses.wrapper }>
                    <article className={_appWindowClasses.article}>
                        { appState !== 'COMPLETE' && 'Loading...' }
                        { mountRef.current }
                    </article>
                    <Scrollbar givenClass={_appWindowClasses.scrollY} direction='VERTICAL' />
                    <Scrollbar givenClass={_appWindowClasses.scrollX} direction='HORIZONTAL' />
                </div>
        </Rnd>
    )
}

export interface AppWindowProps {
    // dndRef: any;
    appContextItem: ActiveApplication;
}
