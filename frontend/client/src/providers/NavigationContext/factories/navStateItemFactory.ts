import { NavigationActionResource, NavigationState } from "../types";

export const build_navStateItemFromPayload = (prevState: NavigationState, payload: NavigationActionResource<'SELECT'>)=> {
    const newStateItem: NavigationState = {
        ...prevState
    };

    newStateItem.id = [ 
        ...newStateItem.id, 
        payload.id 
    ];
    newStateItem.nodes[payload.id] = payload.nodes.current;
    if (!!payload.source) {
        newStateItem.source[payload.id] = payload.source
    } else {
        newStateItem.source[payload.id] = Object.values(newStateItem.source)[-1]
    }
    // newStateItem.position = getNodePosition;
    // newStateItem.menuItem = (id: string)=> getMenuItem(id, newStateItem.source[id]);
    newStateItem._timestamp = window.performance.now();

    return { ...newStateItem };

}
