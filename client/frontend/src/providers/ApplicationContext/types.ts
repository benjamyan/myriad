import React from "react";
import { ActiveApplication, ApplicationDefinition } from "../../types";

export type AppContextState = {
    active: ActiveApplication[];
    // previous: React.MutableRefObject<ActiveApplication[]>;
    previous: React.MutableRefObject<Map<ActiveApplication['appId'],  ActiveApplication>>;
};

// export type AppContextReducerActions = 
//     {
//         type: 'SELECT';
//         /** ID of application as payload */
//         payload: ApplicationDefinition['appId'];
//     } | {
//         type: 'FOCUS';
//         /** ID of application as payload */
//         payload: ApplicationDefinition['appId'];
//     } | {
//         type: 'MINIMIZE';
//         /** ID of application as payload */
//         payload: ApplicationDefinition['appId'];
//     } | {
//         type: 'MAXIMIZE';
//         /** ID of application as payload */
//         payload: ApplicationDefinition['appId'];
//     } | {
//         type: 'UPDATE';
//         /** Object containinig changes */
//         payload: Required<Pick<ActiveApplication, 'appId'>> & Partial<Omit<ActiveApplication, 'appId'>>;
//     } | {
//         type: 'REMOVE';
//         /** Final application definition contaiing all changes */
//         payload: ApplicationDefinition['appId'];
//         // payload: ActiveApplication;
//     };

export type AppContextReducerActions = 
    {
        type: 'SELECT';
        /** ID of application as payload */
        payload: ApplicationDefinition['appId'];
    } | {
        type: 'FOCUS';
        /** ID of application as payload */
        payload: ApplicationDefinition['appId'];
    } | {
        type: 'MINIMIZE';
        /** ID of application as payload */
        payload: ApplicationDefinition['appId'];
    } | {
        type: 'MAXIMIZE';
        /** ID of application as payload */
        payload: ApplicationDefinition['appId'];
    } | {
        type: 'UPDATE';
        /** Object containinig changes */
        payload: Required<Pick<ActiveApplication, 'appId'>> & Partial<Omit<ActiveApplication, 'appId'>>;
    } | {
        type: 'REMOVE';
        /** Final application definition contaiing all changes */
        payload: ApplicationDefinition['appId'];
        // payload: ActiveApplication;
    };

export type AppContextReturnValue = {
    appContextState: AppContextState;
    appContextDispatch: React.Dispatch<AppContextReducerActions>;
}

export type appContextDispatch = AppContextReturnValue['appContextDispatch'];

