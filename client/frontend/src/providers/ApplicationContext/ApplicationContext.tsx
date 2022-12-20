import { default as Axios } from 'axios';
import * as React from 'react';
import { applications } from '../../config';

// import { applications } from '../../config';
import { appContextReducer } from './appContextReducer';
// import * as Util from './utils/appContextUtils';
import { AppContextReturnValue, AppContextReducerMediaryActions } from './types';

const ApplicationContext = React.createContext<AppContextReturnValue | undefined>(undefined);

const applicationContextData: Record<string, any> = {};

const ApplicationContextProvider = ({ children }: any) => {
    const [ appContextState, appContextUpdate] = React.useReducer(
        appContextReducer,
        {
            active: [],
            previous: React.useRef(new Map())
        }
    );
    const activeAppLength = React.useRef<number>(0);
    
    const appContextDispatch = async (action: AppContextReducerMediaryActions)=> {
        appContextUpdate(action);
        // const { type, payload } = action;
        // switch (type) {
        //     case 'SELECT': {
        //         try {
        //             const appDefinition = applications.appItemsById[payload];

        //             if (appDefinition === undefined) {
        //                 throw new Error(`Application not found`);
        //             } else if (applicationContextData[payload]) {
        //                 //
        //                 return;
        //             } else if (appDefinition.sourceContent !== undefined) {
        //                 applicationContextData[payload] = JSON.stringify(appDefinition.sourceContent);
        //             } else if (appDefinition.sourceUrl !== undefined && appDefinition.sourceUrl.length > 0) {
        //                 await Axios(appDefinition.sourceUrl, appDefinition.sourceConfig || {})
        //                     .then((res)=> {
        //                         applicationContextData[payload] = res.data;
        //                     })
        //                     .catch( (err)=>console.error(err) );
        //             } else {
        //                 throw new Error(`Unhandled exception`);
        //             }
        //         } catch (err) {
        //             console.log(err);
        //             return;
        //         } finally {
        //             appContextUpdate(action);
        //         }
        //         break;
        //     }
        //     default: {
                // appContextUpdate(action);
        //     }
        // }
    }

    React.useEffect(()=>{
        if (activeAppLength.current < appContextState.active.length) {
            activeAppLength.current += 1;
            // run our fetch ops here, load the data, set necessary flags
            for (const app of appContextState.active) {
                if (app._ready === false) {
                    (async function(){
                        try {
                            const appDefinition = applications.appItemsById[app.appId];
        
                            if (applicationContextData[app.appId]) {
                                // 
                            } else if (appDefinition.sourceContent !== undefined) {
                                applicationContextData[app.appId] = JSON.stringify(appDefinition.sourceContent);
                            } else if (appDefinition.sourceUrl !== undefined && appDefinition.sourceUrl.length > 0) {
                                await Axios(appDefinition.sourceUrl, appDefinition.sourceConfig || {})
                                    .then((res)=> {
                                        applicationContextData[app.appId] = res.data;
                                    })
                                    .catch( (err)=>console.error(err) );
                            } else {
                                throw new Error(`Unhandled exception`);
                            }
                        } catch (err) {
                            console.log(err);
                            return;
                        } finally {
                            appContextUpdate({
                                type: 'UPDATE',
                                payload: {
                                    appId: app.appId,
                                    _ready: true
                                }
                            });
                        }
                    })()
                } else if (app._ready instanceof Error) {
                    //
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
    ApplicationContextProvider
}