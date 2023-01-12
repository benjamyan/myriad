import * as React from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { HiDocument } from 'react-icons/hi'

import { applications, navigation } from '../../config';
import { useApplicationContext } from '../../providers';
import { Button } from '../../components';

import './_SystemDock.scss';
import { ActiveApplication, ApplicationDefinition, SingleMenuItem } from '../../types';
import { IconType } from 'react-icons';

type SystemDockButtonProps = {

    app: ActiveApplication | undefined;

    appId: ApplicationDefinition['appId'];

    icon?: IconType | string;

    className?: string;

    isDefault: boolean;

    shouldRemove: boolean;
    // isActive: boolean;
    // onSelectDispatch?: ()=> void;
}

let systemTrayDefaultItems: SingleMenuItem[] = [],
    nonDefaultApplications: SingleMenuItem[] = [];

const SystemDockButton = (props: SystemDockButtonProps)=> {
    const { isDefault } = props;
    const { appContextState, appContextDispatch } = useApplicationContext();

    const [btnShouldFireStartAnim, setBtnShouldFireStartAnim] = React.useState<boolean>(isDefault ? false : true);
    const btnRef = React.useRef<HTMLButtonElement>(null);

    const isAppActive = React.useMemo(
        ()=> appContextState.active.some(
            (active)=> props.appId === active.appId
        ),
        [ appContextState.active ]
    );
    const btnClassName = React.useMemo(
        ()=> {
            let initialClassName = ` ${props.appId}`;

            if (isAppActive) {
                initialClassName += ' open';
            }
            if (isDefault) {
                initialClassName += ' default';
            } else {
                if (btnShouldFireStartAnim) {
                    initialClassName += ' animate-in';
                } /*else if (props.shouldRemove) {
                    initialClassName += ' animate-out';
                }*/
            }

            return initialClassName
        },
        [ appContextState.active, btnShouldFireStartAnim] 
    );
    
    React.useEffect(()=>{
        if (!isDefault && btnRef.current !== null) {

            setTimeout(function(){
                setBtnShouldFireStartAnim(false);
            }, 100)

            // document.onanimationend = (e)=> {
            //     console.log(e)
            //     if (e.target === btnRef.current) {
            //         setBtnShouldFireStartAnim(false);
            //     }
            // }
        }
    }, [])

    return (
        <Button.IconButton 
            // key={`jlkadsjklasd-${props.appId}`}
            fRef={ btnRef }
            className={`${props.className || ''} ${btnClassName}`}
            // className={`${isAppActive ? 'active' : ''} ${isDefault ? 'default' : ''} ${btnShouldFireStartAnim ? 'animate-in' : 'animate-out'}`}
            size='INHERIT'
            icon={ props.icon || HiDocument }
            onSingleClick={()=>{
                if (!isAppActive) {
                    appContextDispatch({
                        type: 'SELECT',
                        payload: props.appId as string
                    });
                } else if (props.app !== undefined) {
                    // appContextDispatch({
                    //     type: 'UPDATE',
                    //     payload: {
                    //         appId: props.appId as string,
                    //         _visibility: ''
                    //     }
                    // })
                }
            }}
        />
    );
}

export const SystemDock = ()=> {
    const { appContextState } = useApplicationContext();

    const [ dockLoaded, setDockLoaded ] = React.useState<boolean>(false);
    const [ dockWidth, setDockWidth ] = React.useState<number>(0);
    // const [ applicationButtons, setApplicationButtons ] = React.useState<any>([]);
    const dockRef = React.useRef<HTMLElement>(null);
    
    const shouldRenderActiveApplicationDockItems = React.useMemo(
        ()=>  (
            appContextState.active.length === 0
                ? false
                : !appContextState.active.every( (app)=> (
                        systemTrayDefaultItems
                            .map((item)=> item.appId)
                            .includes(app.appId)
                    ))
        ),
        [ dockLoaded, appContextState.active ]
    );
    
    React.useEffect(()=>{
        systemTrayDefaultItems = Object.values(navigation.systemTrayItems);
        if (dockRef.current !== null && systemTrayDefaultItems.length > 0) {
            setDockLoaded(true)
        }
    }, []);

    // React.useEffect(()=>{
    //     const nonDefaultApplications = (
    //             Object.values(appContextState.active)
    //                 .map((app)=> {
    //                     if (systemTrayDefaultItems.findIndex((trayItem)=> trayItem.appId === app.appId) === -1) {
    //                         return app.appId
    //                     }
    //                     return false
    //                 })
    //                 .filter(Boolean)
    //         ) as string[];
    //     if (nonDefaultApplications.length > applicationButtons.length) {
    //         setApplicationButtons([...nonDefaultApplications])
    //     } else if (nonDefaultApplications.length === applicationButtons.length) {

    //     } else {
            
    //     }
    // }, [ appContextState.active ]);

    React.useLayoutEffect(()=>{
        if (dockRef.current !== null) {
            setDockWidth(
                Array.from(dockRef.current.children).reduce( 
                    (res, el, i, arr)=> (
                        res = i < arr.length - 1 
                            ? el.clientWidth + res 
                            : res
                    ), 0)
            );
        }
    }, [ dockLoaded, appContextState.active ])
    
    return (
        <aside
            className={`system__dock ${dockLoaded ? 'loaded' : 'initial'}`} 
            ref={dockRef} 
            style={{ width: dockWidth }}>
            {/* { shouldRenderActiveApplicationDockItems && (
                <>
                    { applicationButtons.map(({ appId })=> (
                            <SystemDockButton 
                                key={`SystemDock-application-${appId}`}
                                appId={ appId }
                                icon={ applications.appItemsById[appId].icon }
                                isDefault={false}
                                shouldRemove={ appContextState.active.findIndex((activeApp)=>activeApp.appId === appId) === -1 }
                            />
                        )) }
                </>
            )} */}
            { shouldRenderActiveApplicationDockItems && (
                <>
                    { Object.values(appContextState.active).map(({appId})=> {
                        if (systemTrayDefaultItems.findIndex((trayItem)=> trayItem.appId === appId) === -1) {
                            return (
                                <SystemDockButton 
                                    key={`SystemDock-application-${appId}`}
                                    app={appContextState.active.find((app)=>app.appId === appId) }
                                    appId={ appId }
                                    icon={ applications.appItemsById[appId].icon }
                                    isDefault={false}
                                    shouldRemove={false}
                                />
                            )
                        }
                        return null
                    }) }
                    {/* <div className='system__dock--spacer' /> */}
                </>
            )}
            { systemTrayDefaultItems.map( 
                ({ appId, icon, ...item })=> {
                    if (appId && icon) {
                        return (
                            <SystemDockButton 
                                isDefault
                                key={`SystemDock-trayItem-${appId}`}
                                app={ appContextState.active.find((app)=>app.appId === appId)  }
                                appId={ appId }
                                icon={ icon }
                                shouldRemove={false}
                                className={item.menuId}
                            />
                        )
                    }
                    return null
                })
            }
            <div className='system__dock--bg'></div>
        </aside>
    )
}
