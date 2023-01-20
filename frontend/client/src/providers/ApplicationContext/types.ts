import React from "react";
import { ActiveApplication, ApplicationDefinition } from "../../types";

export type AppContextActiveValues = React.MutableRefObject<Map<ActiveApplication['appId'],  Pick<ActiveApplication, 'dimensions' | 'positions' | '_visibility'>>>;
export type ApplicationDataSiloEntry = string | JSON | Error;

export type AppContextState = {
    active: ActiveApplication[];
    previous: React.MutableRefObject<Map<ActiveApplication['appId'],  ActiveApplication>>;
    // previous: React.MutableRefObject<Map<`${ActiveApplication['appId']}-${ActiveApplication['instanceId']}`, ActiveApplication | Pick<ActiveApplication, 'dimensions' | 'positions'>>>;
    values: AppContextActiveValues;

    bucket: React.MutableRefObject<Map<ActiveApplication['appId'],  ApplicationDataSiloEntry>>;
    /** Whether the applications are the focused item in general - can be false if the user is interacting with other elements on the page like the desktop, taskbars, menus, etc. */
    _targeted: boolean;
};

// type AppContextReducerUpdateAction<A extends ReducerUpdateActions | void = void> = {
//     type: 'UPDATE';
//     /** An optional, preconfigured action that can be performed  */
//     action?: A;

//     payload: (
//         A extends ReducerUpdateActions 
//             ? ApplicationDefinition['appId']
//             : Required<Pick<ActiveApplication, 'appId'>> & Partial<Omit<ActiveApplication, 'appId'>>
//     )
// }

/** Predefined actions for common operations 
 * - `MINIMIZE` will set the `_visibility` to 'MINIMIZE'
 * - `MAXIMIZE` will set the `_visibility` to 'MAXIMIZE', and update the `dimensions` and `positions` values so that the window covers the entire screen
 * - `TOGGLE` will get the last `_visibility` property from the value bucket and set the desired apps `_visibility` prop as such
 */
type AppContextReducerUpdateActions = 'FOCUS' | 'MINIMIZE' | 'TOGGLE' |  'MAXIMIZE';
// type ExpectedUpdatePayload<A extends AppContextReducerUpdateActions | void = void> = (
//     A extends void 
//         ? Required<Pick<ActiveApplication, 'appId'>> & Partial<Omit<ActiveApplication, 'appId'>>
//         : ActiveApplication['appId']
// );

export type AppContextReducerActions = 
    {
        type: 'SELECT';
        /** ID of application as payload */
        payload: ApplicationDefinition['appId'] | Required<Pick<ActiveApplication, 'appId'>> & Partial<Omit<ActiveApplication, 'appId'>>;
    } | {
    //     type: 'FOCUS';
    //     /** ID of application as payload */
    //     payload: ApplicationDefinition['appId'];
    // } | {
        type: 'UPDATE';
        /** An optional, preconfigured set of actions that can be performed  */
        action?: AppContextReducerUpdateActions[];
        /** Object containinig changes */
        // payload: (
        //     typeof action extends void 
        //         ? Required<Pick<ActiveApplication, 'appId'>> & Partial<Omit<ActiveApplication, 'appId'>>
        //         : ApplicationDefinition['appId']
        // )
        payload: Required<Pick<ActiveApplication, 'appId'>> & Partial<Omit<ActiveApplication, 'appId'>>;
    } | {
        type: 'REMOVE';
        /** Final application definition contaiing all changes */
        payload: ApplicationDefinition['appId'];
        // payload: ActiveApplication;
    };

// export type NavigationActionResource<T extends AppContextReducerActions['type'], A extends AppContextReducerActions['type'] | void = void> = {
//     type: T;
//     action?: A;
//     payload: ExtractValueByPropKey<AppContextReducerActions, A, 'payload'>
// };

export type AppContextReturnValue = {
    appContextState: AppContextState;
    appContextDispatch: React.Dispatch<AppContextReducerActions>;
}

export type appContextDispatch = AppContextReturnValue['appContextDispatch'];

