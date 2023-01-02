import { default as Axios } from 'axios';
import * as React from 'react';
import { applications } from '../../config';

import { applicationContextData, updateAppContextData, applicationDataLoader } from './appContextDataSilo';
import { appContextReducer } from './appContextReducer';
import { AppContextReturnValue } from './types';

const ApplicationContext = React.createContext<AppContextReturnValue>(undefined!);

// const applicationContextData: Record<string, any> = {};
// const updateAppContextData = (appId: string, content: JSON | string | AxiosResponse['data'])=> {
//     /** Handle validation and whatnot here */
//     applicationContextData[appId] = content;
// }

const ApplicationContextProvider = ({ children }: any) => {
    const [ appContextState, appContextDispatch] = React.useReducer(
        appContextReducer,
        {
            active: [],
            previous: React.useRef(new Map())
        }
    );
    const activeAppLength = React.useRef<number>(0);
    
    React.useEffect(()=>{
        if (activeAppLength.current !== appContextState.active.length) {
            /** Change out ref to active contexts len here so we can handle changes quickly */
            if (activeAppLength.current > appContextState.active.length) {
                activeAppLength.current--;
            } else {
                activeAppLength.current++;
            }
            
            // run our fetch ops here, load the data, set necessary flags
            for (const app of appContextState.active) {
                if (app._ready === false || app._ready instanceof Error) {
                    (async function(){
                        let appInContextData = applicationContextData.get(app.appId);
                        try {
                            const appDefinition = applications.appItemsById[app.appId];
                            
                            if (appInContextData) {
                                /** if it already exists in our context, we dont need to do anything, the data should automaticaally load into the component */
                                return
                            } else if (appDefinition.sourceContent !== undefined) {
                                appInContextData = updateAppContextData(app.appId, appDefinition.sourceContent);
                            } else if (appDefinition.sourceUrl !== undefined && appDefinition.sourceUrl.length > 0) {
                                const remoteContent = (
                                    await Axios(appDefinition.sourceUrl, appDefinition.sourceConfig || {})
                                        .then((res)=> {
                                            return res.data
                                        })
                                        .catch((err)=> {
                                            console.error(err)
                                            return false
                                        })
                                );
                                if (!!remoteContent) {
                                    appInContextData = updateAppContextData(app.appId, remoteContent);
                                    return
                                }
                                throw new Error(`Unhandled exception fetching remote content`);
                            } else {
                                throw new Error(`No source to draw from`);
                            }
                        } catch (err) {
                            console.log(err);
                            appContextDispatch({
                                type: 'UPDATE',
                                payload: {
                                    appId: app.appId,
                                    _ready: err instanceof Error ? err : new Error(`Unhandled exception`)
                                }
                            });
                            return; 
                        } finally {
                            if (appInContextData !== undefined && !(appInContextData instanceof Error)) {
                                setTimeout(()=>{
                                    appContextDispatch({
                                        type: 'UPDATE',
                                        payload:{
                                            appId: app.appId, 
                                            _ready: true 
                                        }
                                    }); 
                                }, 1000);
                            } 
                        }
                    })()
                }
            }
        }
    }, [ appContextState.active ])

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

export type AppContextDispatch = AppContextReturnValue['appContextDispatch'];

export {
    useApplicationContext,
    applicationContextData,
    applicationDataLoader,
    ApplicationContextProvider
}
