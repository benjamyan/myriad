import * as React from 'react';

import { NavigationContextValue, NavigationState, NavigationActionPayload, NavStateNodeType, NavActionNodeRecord } from './types';
import { navigationContextReducer } from './navigationReducer';
import { useNavRef } from './hooks/useNavRef';
import { allNavigationItems } from '../../config/navigation';

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
        },
        _timestamp: 0
    },
    navContextUpdate: ()=> undefined,
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
    const navContextUpdate = navContextDispatch;

    // const navContextUpdate: NavigationDispatchMediary = (action)=> {
    //     try {
    //         switch (action.type) {
    //             // case 'REMOVE': { }
    //             // case 'CLEAR': { }
    //             default: {
    //                 navContextDispatch(action);
    //                 currNavState.current = navContextState;
    //             }
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    
    const navContextClickEventHandler = React.useCallback(
        (event: MouseEvent | TouchEvent | Event)=> {
            /** Click event handler when the menu is open or menu triggers are exposed */
            try {
                console.log(event);
                if (window.performance.now() - currNavState.current._timestamp < 50) {
                    return
                };
                // if (allNavigationItems.find(({menuId})=> menuId ===  ))
                if (currNavState.current.id.length > 0) {
                    const { nodes } = currNavState.current;
                    
                    if (!!nodes) {
                        let _menu: Element | undefined;
                        for (const id of currNavState.current.id) {
                            if (nodes[id].trigger === event.target) {
                                // console.log(1);
                                /** If the triggering button is clicked, close the menu it opened */
                                navContextUpdate({
                                    type: 'REMOVE',
                                    payload: id
                                })
                                return
                            } else if (nodes[id].menu !== undefined) {
                                _menu = nodes[id].menu as Element;
                                
                                /// @ts-expect-error
                                if (!!event.path && event.path.includes(_menu)) {
                                    if (currNavState.current.menuItem(id)?.defereEventHandling) {
                                        return;
                                    } else {
                                        return navContextUpdate({ type: 'CLEAR', payload: null });
                                    }
                                //     return
                                // } else if (Array.from(_menu.children).includes(event.target as Element)) {
                                    // console.log(2);
                                    // const _menuItem = currNavState.current.menuItem(event.target['data-id']);
                                    // if (_menuItem !== undefined ) {
                                    //     if (currNavState.current.menuItem(event.target['data-id'])?.appId !== undefined) {
                                    //         navContextUpdate({ type: 'CLEAR', payload: null })
                                    //     }
                                    // } else {
                                    //     navContextUpdate({ type: 'CLEAR', payload: null })
                                    //     // _menu = undefined;
                                    //     // return
                                    // }
                                    // return
                                } else {
                                    // console.log(3);
                                    navContextUpdate({ type: 'CLEAR', payload: null })
                                }
                                // _menu = undefined;
                                return
                            } else {
                                // console.log(4);
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
    }, []);
    
    React.useEffect(()=>{
        // if (navContextState.id.length === 0) {
        //     document.removeEventListener('click', navContextClickEventHandler);
        // } else if (navContextState.id.length >= 1) {
            document.addEventListener('click', navContextClickEventHandler);
            document.addEventListener('touch', navContextClickEventHandler);
        // }
        currNavState.current = navContextState;
    }, [ navContextState.id ])

    return (
        <NavigationContext.Provider value={{
            navContextState, 
            navContextUpdate: navContextDispatch
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
    useNavRef,
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