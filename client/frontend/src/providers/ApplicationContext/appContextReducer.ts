import { AppContextState, AppContextReducerActions } from './types';
// import { Factory } from '../../utils'
import * as Util from './utils/appContextUtils';
import * as Factory from './utils/contextFactories';
import { applications } from '../../config';
import { ActiveApplication } from '../../types';
// import { appItemsById } from '../../config/applications';

const log = (msg: string)=> true ? undefined : console.log(msg);

const appContextItemInitialLoad = ()=> {

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
            
            const _payload = payload as any;
            const activeAppIndex = Util.findAppIndexById(_state.active, _payload.appId);
            if (activeAppIndex !== undefined) {
                /** TS is weird 
                 * - Recasting these to any because TS wont cast a keyof as `string`
                 * - https://stackoverflow.com/questions/57350092/string-cant-be-used-to-index-type
                 */
                const activeApp: any = {..._state.active[activeAppIndex]};
                for (const _prop in _payload) {
                    if (_prop !== 'appId') {
                        activeApp[_prop ] = _payload[_prop];
                    }
                    if (_payload.dimensions !== undefined) {
                        activeApp.dimensions = [
                            Util.handleDimensionConversion(_payload.dimensions[0], 'x'),
                            Util.handleDimensionConversion(_payload.dimensions[1], 'y')
                        ];
                    }
                }
                _state.active[activeAppIndex] = activeApp;
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
