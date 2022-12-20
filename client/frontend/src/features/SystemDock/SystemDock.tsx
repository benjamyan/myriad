import * as React from 'react';
import { BsTrashFill, BsCloudsFill } from 'react-icons/bs';

import { applications } from '../../config';
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
        <section 
            className='system__dock' 
            ref={dockRef} 
            style={{
                width: dockWidth 
            }}
        >
            <Button.IconButton 
                size='INHERIT'
                // className='system__dock--trash'
                icon={ BsTrashFill }
            />
            <Button.IconButton 
                size='INHERIT'
                // className='system__dock--trash'
                icon={ BsTrashFill }
            />
            <Button.IconButton 
                size='INHERIT'
                // className='system__dock--trash'
                icon={ BsTrashFill }
            />
            <Button.IconButton 
                size='INHERIT'
                icon={ BsCloudsFill }
                onSingleClick={()=>{
                    appContextDispatch({
                        type: 'SELECT',
                        payload: applications.weatherApp.appId
                    });
                }}
            />
            <div className='system__dock--spacer' />
            <Button.IconButton 
                size='INHERIT'
                // className='system__dock--trash'
                icon={ BsTrashFill }
            />
            <div className='system__dock--bg'></div>
        </section>
    )
}