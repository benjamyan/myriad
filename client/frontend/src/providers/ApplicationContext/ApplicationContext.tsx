import * as React from 'react';

import { applications } from '../../config';
import { appContextReducer } from './appContextReducer';
import * as Util from './utils/appContextUtils';
import { AppContextReturnValue, AppContextReducerMediaryActions } from './types';

const ApplicationContext = React.createContext<AppContextReturnValue | undefined>(undefined);

const ApplicationContextProvider = ({ children }: any) => {
    const [ appContextState, appContextUpdate] = React.useReducer(
        appContextReducer,
        {
            active: [],
            previous: React.useRef(new Map())
        }
    );

    const appContextDispatch = async (action: AppContextReducerMediaryActions)=> {
        switch (action.type) {
            case 'SELECT': {
                // const appDefinition = applications.appItemsById[action.payload];
                // if (appDefinition !== undefined && appDefinition.sourceUrl !== undefined && appDefinition.sourceUrl.length > 0) {
                //     await fetch(
                //         appDefinition.sourceUrl,
                //         // {
                //         //     method: 'GET',
                //         //     mode: 'cors',
                //         //     headers: {
                //         //         'Accept': '*',
                //         //         'Authorization': ''
                //         //     }
                //         // }
                //     ) 
                //         .then((res)=>{
                //             console.log(res)
                //             return res
                //         })
                //         .catch(err=> console.error(err))
                // }
                appContextUpdate(action)
                break;
            }
            default: {
                appContextUpdate(action)
            }
        }
    }

    return (
        <ApplicationContext.Provider value={{
            appContextState, 
            appContextDispatch
        }}>
            { children }
        </ApplicationContext.Provider>
    )
}

const useApplicationContext = ()=> {
    try {
        const context = React.useContext(ApplicationContext) as AppContextReturnValue;
        if (context === undefined) {
            throw new Error('An unhandled exception occured in: useApplicationContext');
        }
        return {
            ...context
        }
    } catch (err) {
        console.error(err)
        return {} as AppContextReturnValue
    }
}

export {
    useApplicationContext,
    ApplicationContextProvider
}