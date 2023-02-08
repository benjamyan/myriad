import { AppContextState, AppContextReducerActions } from './types';
import * as Util from './utils/appContextUtils';
import * as Factory from './utils/contextFactories';
import { applications } from '../../config';
import { ActiveApplication, ApplicationDomOptions, ApplicationDomValueCalculated } from '../../types';
import { calculateDomRenderValue } from './utils/appContextUtils';

const dontLog = true;
const log = (msg: string)=> dontLog ? undefined : console.log(msg);

const handleAppContextItemUpdate  = (appToUpdate: ActiveApplication, updates: Partial<ActiveApplication>)=> {
    const appWithUpdates: ActiveApplication = {...appToUpdate};
    for (const _prop in updates) {
        if (_prop !== 'appId' && _prop !== 'instanceId') {
            // Object.defineProperty(appWithUpdates, _prop, updates[_prop] as keyof ActiveApplication);
            // @ts-expect-error
            appWithUpdates[_prop as keyof ActiveApplication] = updates[_prop as keyof ActiveApplication];
        }
        if (updates.dimensions !== undefined) {
            appWithUpdates.dimensions = [...updates.dimensions] as ApplicationDomValueCalculated;
        }
        if (updates.dimensions !== undefined || updates.positions !== undefined) {
            appWithUpdates._controlled = true;
        }
        if (updates._ready !== undefined) {
            appWithUpdates._ready = updates._ready;
        }
    }
    return {...appWithUpdates};
}

export function appContextReducer(appContextState: AppContextState, appContextReducerAction: AppContextReducerActions) {
    const { type, payload } = appContextReducerAction;
    const _state = {
        active: [...appContextState.active],
        previous: appContextState.previous,
        values: appContextState.values,
        bucket: appContextState.bucket,
        _targeted: appContextState._targeted
    };
    const _appId = typeof(payload) === 'string' ? payload : payload.appId;

    const getActiveAppIndexById = ()=> _state.active.findIndex( arrItem=> arrItem.appId === _appId );
    const getAppValuesById = ()=> {
        if (_state.values.current.has(_appId)) {
            return _state.values.current.get(_appId) as Pick<ActiveApplication, "positions" | "dimensions" | '_visibility'> //Pick<AppContextActiveValues['current'], keyof AppContextActiveValues['current']>
        }
        return undefined
    };
    const setValueStateEntry = ()=> {
        _state.values.current.set(_appId, {
            dimensions: [ ..._state.active[activeAppIndexById].dimensions ] as ApplicationDomValueCalculated,
            positions: [ ..._state.active[activeAppIndexById].positions ] as ApplicationDomValueCalculated,
            _visibility: _state.active[activeAppIndexById]._visibility,
            _controlled: _state.active[activeAppIndexById]._controlled
        })
    };
    let activeAppIndexById = getActiveAppIndexById(),
        appValuesById = getAppValuesById();

    appContextReducerType:
    switch (type) {
        case 'SELECT': {
            log('SELECT');

            const _payload = (
                typeof(payload) === 'object'
                    ? payload.appId
                    : payload
            );

            if (activeAppIndexById !== -1) {
                /** If the app is in the currently active context */
                if (_state.active[activeAppIndexById]._visibility && !!appValuesById) {
                    /** Its been minized, bring back to front */
                    _state.active[activeAppIndexById]._visibility = appValuesById._visibility;
                };
            } else {
                /** App is not currently in active */
                const prevAppIndex = _state.previous.current.has(_payload);
                if (prevAppIndex) {
                    /** The app has a previous entry - add that entry to `active` and remove from `previous` */
                    _state.active.unshift({
                        ..._state.previous.current.get(_payload) as ActiveApplication
                    });
                    _state.previous.current.delete(_payload);
                } else {
                    /** App has not been opened before - make a new entry in `active` */
                    const newActiveApp = (
                        Factory.newAppInContext(
                            applications.appItemsById[_payload], 
                            _state.active.length,
                            ( typeof(payload) === 'string' ? {} : payload )
                        )
                    );
                    if (newActiveApp instanceof Error) {
                        console.error(`Factory failed for id: ${_appId}`);
                        break;
                    } else {
                        _state.active.unshift( newActiveApp );
                        activeAppIndexById = getActiveAppIndexById();
                        setValueStateEntry()
                    }
                }
            };
            _state._targeted = true;
            break;
        }
        case 'UPDATE': {
            log('UPDATE')
            const _payload = payload as Partial<ActiveApplication> & Pick<ActiveApplication, 'appId'>;

            if (activeAppIndexById > -1) {
                const referencedActiveApp = { ..._state.active[activeAppIndexById] };
                if (appContextReducerAction.action !== undefined) {
                    if (!appValuesById) {
                        console.error(`Failed to locate ${_appId} in value bucket`)
                        break;
                    };
                    for (const action of appContextReducerAction.action) {
                        log(`- ${action}`);
                        switch (action) {
                            case 'MAXIMIZE': {
                                if (referencedActiveApp._visibility === 'DEFAULT') {
                                    setValueStateEntry()
                                    _state.active[activeAppIndexById] = {
                                        ...referencedActiveApp,
                                        dimensions: ['100%','100%'],
                                        // dimensions: [
                                        //     Generic.handleDomValueConversion('100%', 'x'),
                                        //     Generic.handleDomValueConversion('100%', 'y')
                                        // ],
                                        positions: [0,0],
                                        _visibility: 'MAXIMIZED'
                                    }
                                } else {
                                    _state.active[activeAppIndexById] = {
                                        ...referencedActiveApp,
                                        dimensions: calculateDomRenderValue({
                                            valueOptions: applications.appItemsById[_appId].dimensions as ApplicationDomOptions, 
                                            geometricType: 'dimensions', 
                                            additionalValue: appValuesById?.dimensions
                                        }),
                                        _visibility: 'DEFAULT'
                                    }
                                    _state.active[activeAppIndexById].positions = (
                                        calculateDomRenderValue({
                                            valueOptions: applications.appItemsById[_appId].positions as ApplicationDomOptions, 
                                            geometricType: 'positions', 
                                            additionalValue: appValuesById?.positions, 
                                            applicationDimensions: _state.active[activeAppIndexById].dimensions
                                        })
                                    )
                                }
                                break;
                            }
                            case 'MINIMIZE': {
                                setValueStateEntry()
                                _state.active[activeAppIndexById] = {
                                    ..._state.active[activeAppIndexById],
                                    _visibility: 'MINIMIZED'
                                }
                                break;
                            }
                            case 'TOGGLE': {
                                if (_state.active[activeAppIndexById]._visibility === 'MINIMIZED') {
                                    _state.active[activeAppIndexById] = {
                                        ..._state.active[activeAppIndexById],
                                        _visibility: appValuesById?._visibility
                                    }
                                } else {
                                    setValueStateEntry()
                                    _state.active[activeAppIndexById] = {
                                        ..._state.active[activeAppIndexById],
                                        _visibility: 'MINIMIZED'
                                    }
                                }
                                break;
                            }
                            case 'FOCUS': {
                                if (_state.active.length > 1 && _state.active[activeAppIndexById]._visibility !== 'MINIMIZED') {
                                    const appDefinition = { ..._state.active[activeAppIndexById] };
                                    _state.active.splice(activeAppIndexById, 1);
                                    _state.active.unshift(appDefinition);
                                }
                                break;
                            }
                            case 'RESIZE': {
                                if (_state.active[activeAppIndexById]._visibility === 'MAXIMIZED') {
                                    break appContextReducerType;
                                };
                                const appInConfig = applications.appItemsById[_appId];
                                
                                _state.active[activeAppIndexById].dimensions = calculateDomRenderValue({
                                    valueOptions: appInConfig.dimensions as ApplicationDomOptions, 
                                    geometricType: 'dimensions', 
                                    additionalValue: null, // _state.active[activeAppIndexById].dimensions 
                                    // additionalValue: _state.active[activeAppIndexById]._controlled ? _state.active[activeAppIndexById].dimensions : null
                                });
                                _state.active[activeAppIndexById].positions = calculateDomRenderValue({
                                    valueOptions: appInConfig.positions as ApplicationDomOptions, 
                                    additionalValue: null, // _state.active[activeAppIndexById].positions,
                                    // additionalValue: _state.active[activeAppIndexById]._controlled ? _state.active[activeAppIndexById].positions : null,
                                    geometricType: 'positions',
                                    applicationDimensions: _state.active[activeAppIndexById].dimensions
                                })

                                // if (!add1.every((value, i)=> value === _state.active[activeAppIndexById].dimensions[i])) {
                                //     _state.active[activeAppIndexById].dimensions = add1;
                                // }
                                break;
                            }
                            default: {
                                console.error(`Unhandled action type of ${appContextReducerAction.action}`)
                            }
                        }
                    }
                }
                _state.active[activeAppIndexById] = handleAppContextItemUpdate(_state.active[activeAppIndexById], _payload);
            } else {
                const previouslyActiveApp = appContextState.previous.current.get(payload.appId);
                if (!!previouslyActiveApp) {
                    /** The app is in our previous context, update it there */
                    appContextState.previous.current.set( 
                        payload.appId, 
                        handleAppContextItemUpdate(previouslyActiveApp, _payload) 
                    );
                } else {
                    console.error(`Failed to update ${_appId} in previous state`);
                    break
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

                _state.previous.current.set(
                    appDefinition.appId, appDefinition
                );
                // _state.values.current.delete(_appId);
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
