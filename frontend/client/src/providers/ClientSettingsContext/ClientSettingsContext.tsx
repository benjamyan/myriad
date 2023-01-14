import * as React from 'react';

import { settings } from '../../config'; 

import { clientSettingsReducer } from './clientSettingsReducer';
import { ClientSettingsContextReturnValue, ClientSettingsContextState } from './types';

const ClientSettingsContext = React.createContext<ClientSettingsContextReturnValue>(undefined!);

const defaultClientSettingsContextState: ClientSettingsContextState = {
    location: { ...settings.defaultLocation },
    theme: settings.defaultTheme
}

const ClientSettingsContextProvider = ({ children }: any) => {
    const [ clientSettingsState, clientSettingsDispatch] = React.useReducer(
        clientSettingsReducer,
        defaultClientSettingsContextState
    );

    return (
        <ClientSettingsContext.Provider value={{
            clientSettingsState, 
            clientSettingsDispatch
        }}>
            { children }
        </ClientSettingsContext.Provider>
    )
}

const useClientSettingsContext = ()=> {
    try {
        const context = React.useContext(ClientSettingsContext) as any;
        if (context === undefined) {
            throw new Error('An unhandled exception occured in: useClientSettingsContext');
        }
        return {
            ...context
        }
    } catch (err) {
        console.error(err)
        return {} as ClientSettingsContextState
    }
}

export {
    useClientSettingsContext,
    ClientSettingsContextProvider
}
