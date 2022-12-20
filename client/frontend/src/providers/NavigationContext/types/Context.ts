// import { NavigationOptions } from '../../../config';
import { SingleMenuItem } from '../../../types';

import { NavigationAction, NavActionNodeRecord } from './';

export type NavigationState = {
    /** Unique ID value of the `menuItem` */
    // id: string;
    /** UUID Set of each _active_ `menuItem` */
    id: NavStateId[];
    /** The items source where data is kept */
    source: Record<NavStateId, string>;
    /** Associated element */
    // nodes: React.MutableRefObject<ActiveNavRef>;
    nodes: Record<NavStateId, NavActionNodeRecord>;
    // nodes?: Map<NavStateId, {
    //             trigger: Element | HTMLElement;
    //             menu?: Element | HTMLElement
    //         }>;
    /** Get a tuple of values as T x L x B x R */
    position: (
            id: NavStateId, 
            nodeType: NavStateNodeType
        )=> [number, number, number, number];
    /** Return the associated menu items properties as defined by user */
    menuItem: (id: string)=> SingleMenuItem | undefined;
}

export type NavigationContextValue = {
    navContextState: NavigationState; 
    /** Dispatch function that takes ID and Source attributes and builds a new state */
    navContextUpdate: (args0: NavigationAction)=> void;
}

export type NavStateId = string; // `${keyof NavigationOptions}__${string}`;

export type NavStateNodeType = 'trigger' | 'menu';

