import { default as Axios } from 'axios';
import * as React from 'react';
import { applications } from '../../config';

import { updateAppContextData, applicationDataLoader } from './appContextDataSilo';
import { appContextReducer } from './appContextReducer';
import { useWindowSize } from '../../hooks';
import { AppContextReturnValue } from './types';

const ApplicationContext = React.createContext<AppContextReturnValue>(undefined!);

const ApplicationContextProvider = ({ children }: any) => {
    const [ appContextState, appContextDispatch] = React.useReducer(
        appContextReducer,
        {
            active: [],
            previous: React.useRef(new Map()),
            values: React.useRef(new Map()),
            bucket: React.useRef(new Map()),
            _targeted: true
        }
    );
    const [ width, height ] = useWindowSize();
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
                        let appInContextData = appContextState.bucket.current.get(app.appId);
                        try {
                            const appDefinition = applications.appItemsById[app.appId];
                            
                            if (appInContextData) {
                                /** if it already exists in our context, we dont need to do anything, the data should automaticaally load into the component */
                                return
                            } else if (appDefinition.sourceContent !== undefined) {
                                /** Local content is to be used instead of a provided source URL */
                                appInContextData = updateAppContextData(
                                    appContextState.bucket,
                                    {
                                        appId: app.appId, 
                                        content: appDefinition.sourceContent
                                    }
                                );
                                return;
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
                                    appInContextData = updateAppContextData(
                                        appContextState.bucket,
                                        {
                                            appId: app.appId, 
                                            content: remoteContent
                                        }
                                    );
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
                                appContextDispatch({
                                    type: 'UPDATE',
                                    payload:{
                                        appId: app.appId, 
                                        _ready: true 
                                    }
                                });
                            } 
                        }
                    })()
                }
            }
        }
    }, [ appContextState.active ])

    React.useLayoutEffect(()=>{
        /** Automatically subscribe to width and height changes on the window 
         * This will keep our applications position and dimensions up to date with the DOM
         */
        for (const active of appContextState.active) {
            appContextDispatch({
                type: 'UPDATE',
                action: ['RESIZE'],
                payload: {
                    appId: active.appId
                }
            })
        }
    }, [ width, height ])

    return (
        <ApplicationContext.Provider value={{
            appContextState, 
            appContextDispatch// : mediary
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
    // applicationContextData,
    applicationDataLoader,
    ApplicationContextProvider
}
