
import { NavigationReducer, NavigationActionResource, NavigationState } from "./types";
import { menuItemById, navAreaBySourceName } from './utils';
import { NavigationOptions } from '../../config';


const idRegExp: RegExp = /([A-Z]|[a-z])+(__)+([A-Z]|[a-z])\w+/g;

// const baselineErrorCheck = (action: NavigationAction): Error | true => {
//     try {
//         /** Common ID checks */
//         if (action.payload.id !== undefined) {
//             const _id = action.payload.id;
//             const splitId = _id.split('__');
//             if (typeof(_id) !== 'string') {
//                 /** Failed ID typeof */
//                 throw new Error(`ID must be string but received: ${typeof(_id)}`)
//             }
//             if (!idRegExp.test(_id)) {
//                 /** Failed ID check */
//                 throw new Error(`ID must be formatted correctly: ${_id.toString()}`)
//             }
//             if (navAreaBySourceName(splitId[0]) === undefined) {
//                 throw new Error(`menu item with id ${splitId[1]} not found in ${splitId[0]}`)
//             }
//         }
//         /** Node element checks */
//         if (action.payload.nodes !== undefined) {

//         } else {
            
//         }

//         //  else if (nodes === undefined) {
//         //     /** Invalid nodes provided */
//         //     throw new Error(`Not provided valid nodes`)
//         // }  else {
            
//         //     if (navAreaBySourceName(splitId[0]) === undefined) {
//         //         /** Cannot find in sourece */
                
//         //     } else {
//         //         /** All good */
//         //         // prevNavState.current = { ...navContextState }
//         //         navContextDispatch({
//         //             id: splitId[1],
//         //             // id2: 
//         //             source: splitId[0],
//         //             nodes,
//         //             position(node: 'target' | 'menu' = 'target') {
//         //                 return [
//         //                     (nodes.current[node] as HTMLElement).offsetLeft,
//         //                     (nodes.current[node] as HTMLElement).offsetTop
//         //                 ]
//         //             },
//         //             menuItem() {
//         //                 return menuItemById(splitId[1], splitId[0] as keyof NavigationOptions)
//         //             }
//         //         });
//         //         currNavState.current = navContextState
//         //         return
//         //     }
//         // }
//         return true
//     } catch (err) {
//         console.log(err)
//         return new Error('Unhandled baseline error')
//     }
// }

export const navigationContextReducer: NavigationReducer = (navContextState, navContextAction)=> {
    // if (baselineErrorCheck(navContextAction) instanceof Error) {
    //     return navContextState
    // };
    const { payload } = navContextAction;
    let _state = { ...navContextState };

    const getNodePosition: NavigationState['position'] = (id, nodeType)=> {
        if (!!_state.nodes[id]) {
            const _node = _state.nodes[id][nodeType] as HTMLElement
            if (!!_node) {
                return [
                    _node.offsetTop,
                    0, // calc to get right
                    0, // calc to get bottom
                    _node.offsetLeft
                ]
            }
        }
        return [0,0,0,0]
    };
    const getMenuItem = (id: string, source: string)=> {
        return menuItemById( id, source as keyof NavigationOptions );
    };
    
    switch (navContextAction.type) {
        case 'SELECT':
        case 'UPDATE': {
            const _payload = payload as NavigationActionResource<'SELECT'>;
            if (_payload.id !== undefined && _payload.nodes !== undefined) {
                _state.id = [ ..._state.id, _payload.id ];
                _state.nodes[_payload.id] = _payload.nodes.current;
                if (!!_payload.source) {
                    _state.source[_payload.id] = _payload.source
                } else {
                    _state.source[_payload.id] = Object.values(_state.source)[-1]
                }
                _state.position = getNodePosition;
                _state.menuItem = (id: string)=> getMenuItem(id, _state.source[id]);
            }
            break;
        }
        case 'REMOVE': {
            const _payload = payload as NavigationActionResource<'REMOVE'>;
            _state.id = _state.id.splice(
                _state.id.findIndex( (_id)=> _id === _payload ), 1
            );
            delete _state.nodes[_payload]
            delete _state.source[_payload]
            break;
        }
        case 'CLEAR': {
            _state.id = [];
            _state.nodes = {};
            _state.source = {};
            break;
        }
        default: {
            console.error(`Unhandled type: ${navContextAction.type}`)
        }
    }
    
    return _state
}
