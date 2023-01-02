import * as React from 'react';
import { BsTrashFill } from 'react-icons/bs';

import { navigation } from '../../config';
import { useApplicationContext } from '../../providers';
import { Button } from '../../components';

import './_SystemDock.scss';

export const SystemDock = ()=> {
    const { appContextDispatch } = useApplicationContext();
    const [ dockWidth, setDockWidth ] = React.useState<number>(0);
    const dockRef = React.useRef<HTMLElement>(null);

    React.useEffect(()=>{
        if (dockRef.current !== null) {
            /** Takes the ref (parent section element) and returns the combined width of its children barring the last element (background shape) */
            setDockWidth(
                Array.from(dockRef.current.children)
                    .reduce( (res, el, i, arr)=> (
                            res = i < arr.length - 1 
                                ? el.clientWidth + res 
                                : res
                            ), 0
                        ));
        }
    }, []);

    return (
        <aside
            className='system__dock' 
            ref={dockRef} 
            style={{
                width: dockWidth 
            }}
        >
            { Object.values(navigation.systemTrayItems).map( (navItem)=> {
                    if (navItem.appId && navItem.icon) {
                        return (
                            <Button.IconButton 
                                key={`SystemDock-icon-${navItem.appId}`}
                                size='INHERIT'
                                icon={ navItem.icon }
                                onSingleClick={()=>{
                                    appContextDispatch({
                                        type: 'SELECT',
                                        payload: navItem.appId as string
                                    });
                                }}
                            />
                        )
                    }
                    return null
                }
            )}
            <div className='system__dock--spacer' />
            <Button.IconButton 
                size='INHERIT'
                icon={ BsTrashFill }
            />
            <div className='system__dock--bg'></div>
        </aside>
    )
}
