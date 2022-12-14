import * as React from 'react';

import { NavigationContextValue, NavigationState, NavigationDispatchMediary, NavigationActionPayload, NavStateNodeType, NavActionNodeRecord } from './types';
import { navigationContextReducer } from './navigationReducer';

const initialContextValue: NavigationContextValue = {
    navContextState: {
        id: [],
        // id2: new Set(),
        source: {},
        nodes: {},
        // nodes2: null,
        position() {
            return [0, 0, 0, 0]
        },
        menuItem() {
            return undefined
        }
    },
    navContextUpdate: ()=> undefined
};

const NavigationContext = React.createContext<NavigationContextValue>(initialContextValue);

interface NavigationContextProvider {
    children: React.ReactNode
}
const NavigationContextProvider = ({ children }: NavigationContextProvider) => {
    const [ navContextState, navContextDispatch] = React.useReducer(
        navigationContextReducer,
        initialContextValue.navContextState
    );
    // const prevNavState = React.useRef<Pick<NavigationState, 'id'>>(null);
    const currNavState = React.useRef<NavigationState>(navContextState);
    
    const navContextUpdate: NavigationDispatchMediary = (action)=> {
        try {
            switch (action.type) {
                // case 'REMOVE': { }
                // case 'CLEAR': { }
                default: {
                    // prevNavState.current = {...navContextState};
                    navContextDispatch(action);
                    currNavState.current = navContextState;
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    const navContextClickEventHandler = React.useCallback(
        (event: React.MouseEvent | Event)=> {
            try {
                if (currNavState.current.id.length > 0) {
                    const _nodes = currNavState.current.nodes;
                    if (!!_nodes) {
                        let _trigger, _menu;
                        for (const id of currNavState.current.id) {
                            if (_nodes[id].trigger === event.target) {
                                navContextUpdate({
                                    type: 'REMOVE',
                                    payload: id
                                })
                                return
                            } else if (_nodes[id].menu !== undefined) {
                                _menu = _nodes[id].menu as Element
                                if (Array.from(_menu.children).includes(event.target as Element)) {
                                    // const _menuItem = currNavState.current.menuItem(event.target['data-id']);
                                    // if (_menuItem !== undefined ) {
                                    //     if (currNavState.current.menuItem(event.target['data-id'])?.appId !== undefined) {
                                    //         navContextUpdate({ type: 'CLEAR', payload: null })
                                    //     }
                                    // } else {
                                        navContextUpdate({ type: 'CLEAR', payload: null })
                                    // }
                                }
                                _menu = undefined;
                                return
                            } else {
                                navContextUpdate({ type: 'CLEAR', payload: null })
                                return
                            }
                        }
                    }
                }
            } catch (err) {
                console.log(err)
            }
        },
        []
    );

    React.useEffect( ()=> {
        initialContextValue.navContextUpdate = navContextUpdate;
        document.addEventListener('click', navContextClickEventHandler)
        // return ()=> {
        //     document.removeEventListener('click', navContextClickEventHandler)
        // }
    }, []);

    React.useEffect(()=>{
        currNavState.current = navContextState;
    }, [ navContextState.id ])

    return (
        <NavigationContext.Provider value={{
            navContextState, 
            navContextUpdate
        }}>
            { children }
        </NavigationContext.Provider>
    )
}

const useNavigationContext = ()=> {
    const context = React.useContext(NavigationContext) as NavigationContextValue;
    if (context instanceof Error || context === undefined) {
        console.error('Unhandled exception in NavigationContext');
        return initialContextValue
    }
    return {
        ...context
    }
}

export {
    useNavigationContext,
    NavigationContextProvider
}
export type {
    NavigationContext,
    NavigationState,
    NavStateNodeType,
    NavigationActionPayload,
    NavActionNodeRecord
}