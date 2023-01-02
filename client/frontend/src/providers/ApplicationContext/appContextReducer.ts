import { AppContextState, AppContextReducerActions } from './types';
// import { Factory } from '../../utils'
import * as Util from './utils/appContextUtils';
import * as Factory from './utils/contextFactories';
import { applications } from '../../config';
import { ActiveApplication } from '../../types';

const log = (msg: string)=> true ? undefined : console.log(msg);

const handleAppContextItemUpdate  = (appToUpdate: ActiveApplication, updates: Partial<ActiveApplication>)=> {
    const appWithUpdates: ActiveApplication = {...appToUpdate};
    for (const _prop in updates) {
        if (_prop !== 'appId') {
            // Object.defineProperty(appWithUpdates, _prop, updates[_prop] as keyof ActiveApplication);
            appWithUpdates[_prop] = updates[_prop] as keyof ActiveApplication;
        }
        if (updates.dimensions !== undefined) {
            appWithUpdates.dimensions = [
                Util.handleDimensionConversion(updates.dimensions[0], 'x'),
                Util.handleDimensionConversion(updates.dimensions[1], 'y')
            ];
        }
        if (updates._ready !== undefined) {
            appWithUpdates._ready = updates._ready;
        }
    }
    return {...appWithUpdates};
}

export function appContextReducer(appContextState: AppContextState, appContextReducerAction: AppContextReducerActions) {
    const _state = {
        active: [...appContextState.active],
        previous: appContextState.previous
    };
    const { type, payload } = appContextReducerAction;
    
    switch (type) {
        case 'SELECT': {
            log('SELECT')

            const _payload = payload as string;
            const activeAppIndexById = Util.findAppIndexById(_state.active, _payload);
            if (activeAppIndexById !== -1) {
                /** If the app is in the currently active context */
                if (!_state.active[activeAppIndexById].isVisible) {
                    /** Its closed.. set to open */
                    _state.active[activeAppIndexById].isVisible = true;
                };
            } else {
                /** App is not currently in active */
                const prevAppIndex = _state.previous.current.has(_payload);
                if (prevAppIndex) {
                    /** The app has a previous entry - add that entry to `active` and remove from `previous` */
                    _state.active.unshift({
                        ..._state.previous.current.get(_payload) as ActiveApplication,
                        isVisible: true
                    });
                    _state.previous.current.delete(_payload);
                } else {
                    console.log(_payload)
                    /** App has not been opened before - make a new entry in `active` */
                    const newActiveApp = (
                        Factory.newAppInContext(applications.appItemsById[_payload], _state.active.length)
                    );
                    if (newActiveApp instanceof Error) {
                        //
                    } else {
                        _state.active.unshift( newActiveApp );
                    }
                }
            };
            break;
        }
        case 'FOCUS': {
            log('FOCUS')

            const _payload = payload as string;
            try {
                if (_state.active.length > 1) {
                    let currentApp: ActiveApplication;
                    const focusedAppIndex = Util.findAppIndexById(_state.active, _payload);
                    
                    if (focusedAppIndex !== undefined) {
                        const appDefinition = { ..._state.active[focusedAppIndex] };
                        _state.active.splice(focusedAppIndex, 1);
                        _state.active.unshift(appDefinition);
                    }
                }
            } catch (err) {
                console.error(err)
            }
            break;
        }
        case 'MINIMIZE': {
            console.log('MINIMIZE TODO')
            // const _payload = payload as string;

            break;
        }
        case 'MAXIMIZE': {
            console.log('MAXIMIZE TODO')

            break;
        }
        case 'UPDATE': {
            log('UPDATE')
            
            const _payload = payload as Partial<ActiveApplication> & Pick<ActiveApplication, 'appId'>;
            
            const activeAppIndex = Util.findAppIndexById(_state.active, _payload.appId);
            if (activeAppIndex > -1) {
                _state.active[activeAppIndex] = handleAppContextItemUpdate(_state.active[activeAppIndex], _payload);
            } else {
                const previouslyActiveApp = appContextState.previous.current.get(payload.appId);
                if (!!previouslyActiveApp) {
                    /** The app is in our previous context, update it there */
                    appContextState.previous.current.set( 
                        payload.appId, 
                        handleAppContextItemUpdate(previouslyActiveApp, _payload) 
                    ); 
                } else {
                    // ...how did you get here??
                }
            }
            break;
        }
        case 'REMOVE': {
            log('REMOVE')

            const _payload = payload as string;
            const activeAppIndex = Util.findAppIndexById(_state.active, _payload);

            if (activeAppIndex !== undefined) {
                let appDefinition = { ..._state.active[activeAppIndex]  };
                appDefinition.isVisible = false;
                _state.previous.current.set(
                    appDefinition.appId, appDefinition
                );
                _state.active.splice(activeAppIndex, 1);
            }
            break;
        }
        default: {
            console.error('Undefined dispatch type')
        }
    }

    return _state
}
