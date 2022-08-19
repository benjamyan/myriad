import { NavStateId, NavStateNodeType, NavigationState } from "./";

export type NavActionNodeRecord = Record<NavStateNodeType, Element | undefined>;

export type NavigationActionPayload = {
    id: NavStateId;
    /** If not provided, the last source provided will be used */
    source?: string;
    nodes: React.MutableRefObject<NavActionNodeRecord>;
}

export type NavigationActionDefs = 
    {
        /** Invokes the state on a specific menu item */
        type: 'SELECT',
        payload: NavigationActionPayload
    } | {
        /** Adds a menu item to the currently active state */
        type: 'UPDATE';
        payload: NavigationActionPayload
    } | {
        /** Removes an ID and its corresponding nodes that are downstream */
        type: 'REMOVE';
        payload: NavStateId;
    } | {
        /** Clears the entire menu state */
        type: 'CLEAR';
        payload: null
    };

export type NavigationAction = {
    type: NavigationActionDefs['type'];
    payload: NavigationActionResource<NavigationActionDefs['type']>;
}

export type NavigationReducer = (
        args0: NavigationState,
        args1: NavigationAction
    )=> NavigationState;

export type NavigationDispatchMediary = (
        args0: NavigationAction
    )=> void;

type ExtractPayload<A extends NavigationActionDefs, T extends NavigationActionDefs['type']> = 
    A extends { type: T } ? A : never;
export type NavigationActionResource<T extends NavigationActionDefs['type']> = 
    ExtractPayload<NavigationActionDefs, T>['payload'];
