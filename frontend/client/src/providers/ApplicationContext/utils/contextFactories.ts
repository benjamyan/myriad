import { ActiveApplication, ApplicationDefinition } from "../../../types";
import * as Util from './appContextUtils';
import { Generic } from '../../../utils';

export const newAppInContext = (app: ApplicationDefinition, contentLen: number): ActiveApplication | Error => {
    try {
        return {
            appId: app.appId,
            instanceId: Generic.generateUuid(),
            positions: [25  * (contentLen + 1), 25],
            dimensions: (
                app.dimensions !== undefined
                    ? [
                        Util.handleDimensionConversion(app.dimensions[0], 'x'),
                        Util.handleDimensionConversion(app.dimensions[1], 'y')
                    ]
                    : [300, 300]
            ),
            _visibility: 'DEFAULT',
            _ready: false
        }
    } catch (err) {
        console.log(err)
        if (err instanceof Error) {
            return err
        } else {
            return new Error('Unhandled exception when trying to open window');
        }
    }
}
