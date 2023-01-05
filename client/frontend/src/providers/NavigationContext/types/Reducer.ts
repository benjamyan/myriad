import { NavStateId, NavStateNodeType, NavigationState } from "./";
import { ExtractValueByPropKey } from '../../../types';

// export type NavActionNodeRecord = Record<NavStateNodeType, HTMLElement | undefined>;
export type NavActionNodeRecord = {
    // [NavStateNodeType]: HTMLElement | undefined;
    trigger: HTMLElement | HTMLButtonElement;
    menu: HTMLElement | undefined;
};

export type NavigationActionPayload = {
    id: NavStateId;
    /** If not provided, the last source provided will be used */
    source?: string;
    /** 
     * Provide the triggering element and/or the menu it spawned so the listener can track user interactions 
     * - `trigger` should be the invoking button
     * - `menu` should be the menu it invoked
     * */
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
    // payload: ExtractValueByPropKey<NavigationActionDefs, NavigationActionDefs['type'], 'payload'>;
    payload: NavigationActionResource<NavigationActionDefs['type']>;
}

export type NavigationReducer = (
        args0: NavigationState,
        args1: NavigationAction
    )=> NavigationState;

export type NavigationDispatchMediary = (
        args0: NavigationAction
    )=> void;

// type ExtractPayload<A extends NavigationActionDefs, T extends NavigationActionDefs['type']> = 
//     A extends { type: T } ? A : never;
// export type NavigationActionResource<T extends NavigationActionDefs['type']> = 
//     ExtractPayload<NavigationActionDefs, T>['payload'];
export type NavigationActionResource<T extends NavigationActionDefs['type']> = (
    ExtractValueByPropKey<NavigationActionDefs, T, 'payload'>
);
