import { ClientSettingsContextState, ExtractValueByPropKey } from "../../../types";

export type ClientSettingsActionPayload = {
    /** The key of the property youre trying to update */
    id: string;
    /** The desired value (if any) */
    value: any;
}

export type ClientSettingsContextActionDefs = 
    {
        /** Adds a menu item to the currently active state */
        type: 'UPDATE';
        payload: ClientSettingsActionPayload
    };

export type ClientSettingsContextAction = {
    type: ClientSettingsContextActionDefs['type'];
    payload: ExtractValueByPropKey<ClientSettingsContextActionDefs, ClientSettingsContextActionDefs['type'], 'payload'>;
}

// export type ClientSettingsReducer = (
//         args0: ClientSettingsState,
//         args1: ClientSettingsAction
//     )=> ClientSettingsState;

// export type ClientSettingsDispatchMediary = (
//         args0: ClientSettingsAction
//     )=> void;

export type ClientSettingsContextReturnValue = {
    clientSettingsState: ClientSettingsContextState;
    clientSettingsDispatch: React.Dispatch<ClientSettingsContextAction>;
}

export type ClientSettingsContextDispatch = ClientSettingsContextReturnValue['clientSettingsDispatch'];

// type ExtractPayload<A extends ClientSettingsActionDefs, T extends ClientSettingsActionDefs['type']> = 
//     A extends { type: T } ? A : never;
// export type ClientSettingsActionResource<T extends ClientSettingsActionDefs['type']> = 
//     ExtractPayload<ClientSettingsActionDefs, T>['payload'];
