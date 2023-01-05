
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

            _state.id = _state.id.splice(
                _state.id.findIndex( (_id)=> _id === _payload ), 1
            );
            delete _state.nodes[_payload]
            delete _state.source[_payload]
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
