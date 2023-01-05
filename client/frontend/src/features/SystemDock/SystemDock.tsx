import * as React from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { HiDocument } from 'react-icons/hi'

import { applications, navigation } from '../../config';
import { useApplicationContext } from '../../providers';
import { Button } from '../../components';

import './_SystemDock.scss';
import { ApplicationDefinition, SingleMenuItem } from '../../types';
import { IconType } from 'react-icons';

type SystemDockButtonProps = {
    appId: ApplicationDefinition['appId'];
    icon?: IconType;
    // isActive: boolean;
    // onSelectDispatch?: ()=> void;
}

let systemTrayDefaultItems: SingleMenuItem[] = [];

const SystemDockButton = (props: SystemDockButtonProps)=> {
    const { appContextState, appContextDispatch } = useApplicationContext();

    const isAppActive = React.useMemo(
        ()=> (
            appContextState.active.some((active)=> props.appId === active.appId)
        ),
        [ appContextState.active ]
    );

    return (
        <Button.IconButton 
            className={ isAppActive ? 'active' : '' }
            size='INHERIT'
            icon={ props.icon || HiDocument }
            onSingleClick={()=>{
                if (!isAppActive) {
                    appContextDispatch({
                        type: 'SELECT',
                        payload: props.appId as string
                    });
                }
            }}
        />
    );
}

const DefaultDockButtons = ()=> (
    <>
        { Object.values(navigation.systemTrayItems).map( 
            ({ appId, icon })=> {
                if (appId && icon) {
                    return (
                        <SystemDockButton 
                            key={`SystemDock-trayItem-${appId}`}
                            appId={ appId }
                            icon={ icon }
                        />
                    )
                }
                return null
            })
        }
        <Button.IconButton 
            size='INHERIT'
            icon={ BsTrashFill }
        />
    </>
)

export const SystemDock = ()=> {
    const { appContextState } = useApplicationContext();

    const [ dockLoaded, setDockLoaded ] = React.useState<boolean>(false);
    const [ dockWidth, setDockWidth ] = React.useState<number>(0);
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
    
    return React.useMemo(
        ()=> (
            <aside
                className='system__dock' 
                ref={dockRef} 
                style={{ width: dockWidth }}>
                { shouldRenderActiveApplicationDockItems && (
                    <>
                        { Object.values(appContextState.active).map(({appId})=> {
                            if (systemTrayDefaultItems.findIndex((trayItem)=> trayItem.appId === appId) === -1) {
                                return (
                                    <SystemDockButton 
                                        key={`SystemDock-application-${appId}`}
                                        appId={ appId }
                                        icon={ applications.appItemsById[appId].icon }
                                    />
                                )
                            }
                            return null
                        }) }
                        {/* <div className='system__dock--spacer' /> */}
                    </>
                )}
                { systemTrayDefaultItems.map( 
                    ({ appId, icon })=> {
                        if (appId && icon) {
                            return (
                                <SystemDockButton 
                                    key={`SystemDock-trayItem-${appId}`}
                                    appId={ appId }
                                    icon={ icon }
                                />
                            )
                        }
                        return null
                    })
                }
                <Button.IconButton 
                    size='INHERIT'
                    icon={ BsTrashFill }
                />
                <div className='system__dock--bg'></div>
            </aside>
        ),
        [ dockLoaded, dockWidth, appContextState.active ]
    )
}
