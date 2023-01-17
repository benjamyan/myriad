
import { NavigationReducer, NavigationActionResource, NavigationState } from "./types";
import { navigation } from '../../config';

const getMenuItem = (id: string, source: string)=> {
    return navigation.allNavigationItems[id]
};
let getNodePosition: NavigationState['position'] = null!; 

export const navigationContextReducer: NavigationReducer = (navContextState, navContextAction)=> {
    const { payload } = navContextAction;
    let _state = { ...navContextState };
    
    if (getNodePosition === null) {
        getNodePosition = (id, nodeType)=> {
            const nodeInContext = _state.nodes[id]
            if (!!nodeInContext) {
                const _node = nodeInContext[nodeType] as HTMLElement;
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
    }

    switch (navContextAction.type) {
        case 'SELECT':
        case 'UPDATE': {
            const _payload = payload as NavigationActionResource<'SELECT'>;

            if (_payload.id !== undefined && _payload.nodes !== undefined) {

                /** Parse the payload nodes to check against currently active navigation items 
                 * @if the node if not present as a child, clear the context
                 */
                let removeCurrentStateEntry = true;
                navigationChildElementCheck:
                if (_state.id.length > 0) {
                    for (const node in _state.nodes) {
                        if (Object.values(_state.nodes[node]).includes(_payload.nodes.current.trigger)) {
                            removeCurrentStateEntry = false;
                            break navigationChildElementCheck;
                        }
                    }
                } else {
                    removeCurrentStateEntry = false;
                }
                
                /** Perform our ancilary stateful ops here prior to invoking our next item */
                if (removeCurrentStateEntry) {
                    _state = navigationContextReducer(_state, {
                        type: 'CLEAR',
                        payload: null
                    })
                } else if (_state.id.includes(_payload.id)) {
                    /** If the selected item is already active in the navigation, toggle it closed */
                    return navigationContextReducer(_state, {
                        type: 'REMOVE',
                        payload: _payload.id
                    })
                }
                
                _state.id = [ 
                    ..._state.id, 
                    _payload.id 
                ];
                _state.nodes[_payload.id] = _payload.nodes.current;
                if (!!_payload.source) {
                    _state.source[_payload.id] = _payload.source
                } else {
                    _state.source[_payload.id] = Object.values(_state.source)[-1]
                }
                _state.position = getNodePosition;
                _state.menuItem = (id: string)=> getMenuItem(id, _state.source[id]);
                _state._timestamp = window.performance.now();
            }
            break;
        }
        case 'REMOVE': {
            const _payload = payload as NavigationActionResource<'REMOVE'>;

            if (_state.id.length > 0) {
                const newState: NavigationState = { ..._state };

                newState.id.splice(
                    newState.id.findIndex( (_id)=> _id === _payload ), 1
                );
                delete newState.nodes[_payload];
                delete newState.source[_payload];

                _state = {...newState};

                // _state.id = _state.id.splice(
                //     _state.id.findIndex( (_id)=> _id === _payload ), 1
                // );
                // delete _state.nodes[_payload]
                // delete _state.source[_payload]
            }

            break;
        }
        case 'CLEAR': {
            // console.trace()
            
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
