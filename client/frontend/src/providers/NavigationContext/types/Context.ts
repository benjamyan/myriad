// import { NavigationOptions } from '../../../config';
import { SingleMenuItem } from '../../../types';

import { NavigationAction, NavActionNodeRecord } from './';

export type NavigationState = {
    /** UUID Set of each _active_ `menuItem` */
    id: NavStateId[];
    /** The items source where its `config` data is kept - see the `config/navigation.ts` for their individual definitions  */
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
            // node: Element,
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

