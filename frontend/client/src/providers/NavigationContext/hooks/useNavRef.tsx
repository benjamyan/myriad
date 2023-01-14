import * as React from 'react'
import { SingleMenuItem } from '../../../types';
import { useNavigationContext } from '../NavigationContext';
import { NavActionNodeRecord, NavStateNodeType } from '../types';

export const useNavRef = ()=> {
    const { navContextState } = useNavigationContext();
    
    const navRef = React.useRef<NavActionNodeRecord>({
        trigger: null!,
        menu: undefined
    });

    const setNavRef = React.useCallback(
        (type: NavStateNodeType, node: HTMLElement)=> {
            navRef.current[type] = node;
            return navRef.current[type]
        },
        [ navContextState.id ]
    );

    const setNavTriggerRef = (navItemId: SingleMenuItem['menuId'])=> (
        navContextState.id[0] === navItemId ? setNavRef.bind(null, 'trigger') : null
    );
    const setNavMenuRef = setNavRef.bind(null, 'menu');

    return {
        /** The instances ref value. Do not use this in an internal react component for local reference */
        navRef, 
        setNavRef,
        setNavTriggerRef,
        setNavMenuRef
    }

}
