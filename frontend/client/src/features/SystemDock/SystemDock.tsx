import * as React from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { HiDocument } from 'react-icons/hi';
import { Button } from 'myriad-ui';

import { applications, navigation } from '../../config';
import { useApplicationContext } from '../../providers';
// import { Button } from '../../components';

import './_SystemDock.scss';
import { ActiveApplication, ApplicationDefinition, SingleMenuItem } from '../../types';
import { IconType } from 'react-icons';

type SystemDockButtonProps = {

    // app: ActiveApplication | undefined;

    appId: ApplicationDefinition['appId'];

    menuIcon?: IconType | string;

    className?: string;

    // isDefault: boolean;

    // onClickHandler: (event: MouseEvent | TouchEvent, appId: Pick<ApplicationDefinition, 'appId'>)=> void;
    onClickHandler: (event: MouseEvent | TouchEvent, appId: string)=> void;
    // shouldRemove: boolean;
    // isActive: boolean;
    // onSelectDispatch?: ()=> void;
}

const BUTTON_CLASS = 'system__dock--button';
let systemTrayDefaultItems: SingleMenuItem[] = [];

const SystemTrayButton = (props: { className?: string, icon?: IconType | string, appId: string })=> {
    const { appContextState, appContextDispatch } = useApplicationContext();
    const appIsActive = (
        appContextState.active.findIndex(({appId})=> appId === props.appId) > -1
    );

    return (
        <div className={`${BUTTON_CLASS} ${props.appId} ${props.className || ''}`}>
            <Button.IconButton 
                size='INHERIT' 
                icon={ props.icon || applications.appItemsById[props.appId].icon || HiDocument }
                onSingleClick={()=>{
                    if (!appIsActive) {
                        appContextDispatch({
                            type: 'SELECT',
                            payload: props.appId as string
                        });
                    } else {
                        appContextDispatch({
                            type: 'UPDATE',
                            action: ['TOGGLE','FOCUS'],
                            payload: {
                                appId: props.appId as string
                            }
                        })
                    }
                }}
            />
            <span className={appIsActive ? 'open' : ''}></span>
        </div>
    )
};
const ActiveApplicationDockButtons = ()=> {
    const { appContextState } = useApplicationContext();
    const [ appButtons, setAppButtons ] = React.useState<ActiveApplication['appId'][]>([]);
    
    React.useEffect(()=>{
        /** Initial check against each length; if theyre equal do nothing */
        if (appContextState.active.length > appButtons.length) {
            /** More context items than buttons - find the missing items and add to state */
            for (const appContextItem of appContextState.active) {
                if (!appButtons.some((appId)=> appContextItem.appId === appId)) {
                    setAppButtons([appContextItem.appId, ...appButtons ])
                }
            }
        } else if (appContextState.active.length < appButtons.length) {
            for (const appId of appButtons) {
                if (!appContextState.active.some((appContextItem)=> appContextItem.appId === appId)) {
                    appButtons.splice(appButtons.findIndex(id=> id === appId), 1)
                    setAppButtons([ ...appButtons ])
                }
            }
        }
    }, [ appContextState ])

    return (
        <>
            {   appButtons.map((appId, i)=> {
                    if (systemTrayDefaultItems.findIndex((trayItem)=> trayItem.appId === appId) === -1) {
                        return (
                            <SystemTrayButton 
                                key={`SystemDock-trayItem-${appId}-${i}`}
                                appId={appId} 
                            />
                        )
                    }
                    return null
                }) 
            }
        </>
    )
    // return (
    //     <>
    //         {   Object.values(appContextState.active).map(({appId}, i)=> {
    //                 if (systemTrayDefaultItems.findIndex((trayItem)=> trayItem.appId === appId) === -1) {
    //                     return (
    //                         <SystemTrayButton 
    //                             key={`SystemDock-trayItem-${appId}-${i}`}
    //                             appId={appId} 
    //                         />
    //                     )
    //                 }
    //                 return null
    //             }) 
    //         }
    //     </>
    // )
};

export const SystemDock = ()=> {
    const [ dockLoaded, setDockLoaded ] = React.useState<boolean>(false);
    // const [ dockWidth, setDockWidth ] = React.useState<number>(0);
    const dockRef = React.useRef<HTMLElement>(null);
    
    React.useEffect(()=>{
        systemTrayDefaultItems = Object.values(navigation.systemTrayItems);
        if (dockRef.current !== null && systemTrayDefaultItems.length > 0) {
            setDockLoaded(true)
        }
    }, []);
    
    // React.useLayoutEffect(()=>{
    //     if (dockRef.current !== null) {
    //         setDockWidth(
    //             Array.from(dockRef.current.children).reduce( 
    //                 (res, el, i, arr)=> (
    //                     res = i < arr.length - 1 
    //                         ? el.clientWidth + res 
    //                         : res
    //                 ), 0)
    //         );
    //     }
    // }, [ dockLoaded, appContextState.active ])
    
    return (
        <aside ref={dockRef} className={`system__dock ${dockLoaded ? 'loaded' : 'initial'}`} /*style={{ width: dockWidth }}*/>
                <ActiveApplicationDockButtons />
                { Object.values(navigation.systemTrayItems).map( 
                    ({ appId, icon }, i)=> {
                        if (appId && icon) {
                            return (
                                <SystemTrayButton 
                                    key={`SystemDock-trayItem-${appId}-${i}`}
                                    className='default'
                                    icon={ icon } 
                                    appId={ appId } 
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
