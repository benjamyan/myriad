import * as React from 'react';
import { Rnd, RndResizeCallback, RndDragCallback } from 'react-rnd' // https://github.com/bokuweb/react-rnd

import { Scrollbar } from '../../components';
import { applications } from '../../config';
import { reactRnd } from '../../libs'
import { ActiveApplication } from '../../types';
import { useApplicationContext } from '../../providers';
import './_ApplicationWindow.scss';

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
    const mountRef = React.useRef<any>(null);
    
    const [applicationContent, setApplicationContent] = React.useState<React.ReactElement>(<div>baseline</div>)

    const onMenuBarIconClickHandler = (event: React.MouseEvent, action: 'CLOSE' | 'MINIMIZE' | 'MAXIMIZE')=> {
        event.stopPropagation();
        switch (action) {
            case 'CLOSE': {
                appContextDispatch({
                    type:'REMOVE',
                    payload: applicationItem.appId
                })
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
        (function() {
            const fn = async ()=> {
                try {
                    const appDefinition = applicationItem;
                    if (appDefinition !== undefined && appDefinition.sourceUrl !== undefined && appDefinition.sourceUrl.length > 0) {
                        const appRemoteData = (
                            await fetch(appDefinition.sourceUrl)
                                .then(res=> res.text() )
                                .then((html)=> {
                                    /** Load the HTML */
                                    const remoteHtml = new DOMParser().parseFromString(html, "text/html");
                                    
                                    const style = remoteHtml.getElementsByTagName('style')[0];
                                    const component = remoteHtml.getElementsByTagName('section')[0];
                                    const script = remoteHtml.getElementsByTagName('script')[0];
                                    
                                    const givenId = component.id;
                                    
                                    class CustomWebComponent extends HTMLElement implements React.ReactElement{
                                        props: {};
                                        type: React.ReactHTML['div'];
                                        key: 'fgdafgasdgfdagdfgsdfg';
                                        constructor() {
                                            super();
                                            this.attachShadow({ mode: 'open' });
                                            this.props = {};
                                            this.key = 'fgdafgasdgfdagdfgsdfg';
                                            this.type = React.createFactory('div')
                                            if (!!style) {
                                                this.shadowRoot?.append(style);
                                            };
                                            if (!!component) {
                                                this.shadowRoot?.append(component);
                                            };
                                            if (!!script) {
                                                this.shadowRoot?.append(script);
                                                window.eval(this.shadowRoot?.querySelector('script')?.innerText || '');
                                                (window as any).initCustomRender(this.shadowRoot, givenId)
                                            };
                                        }
                                    }
                                    customElements.define(givenId, CustomWebComponent);

                                    
                                    const customElementReference = customElements.get(givenId);
                                    
                                    if (!!customElementReference) {
                                        // const x = React.createElement('div', new customElementReference);
                                        // mountRef.current.children = new customElementReference
                                        // ReactDOM.render(
                                        //     <React.StrictMode>
                                        //         { x }
                                        //     </React.StrictMode>,
                                        //     mountRef.current
                                        // )
                                        // console.log(x)
                                        return <>{ new customElementReference }</>
                                    }
                                    throw new Error('no')
				
                                })
                                .catch(err=>{
                                    console.error(err)
                                    return setApplicationContent(<>nahhhhh</>)
                                })
                        );
                        return setApplicationContent(<>{appRemoteData}</>);
                    }
                } catch (err) {
                    console.log(err)
                    return setApplicationContent(<>hahaha</>)
                }
            }
            fn()
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
                        <div ref={mountRef} id={`${applicationItem.appId}-mount`} className={_appWindowClasses.articleInner}>
                            { applicationContent }
                        </div>
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
