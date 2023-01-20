import { ActiveApplication, ApplicationDefinition } from "../../../types";
import * as Util from './appContextUtils';
import { Generic } from '../../../utils';

export const newAppInContext = (app: ApplicationDefinition, contentLen: number, options: Partial<ActiveApplication>): ActiveApplication | Error => {
    try {
        const newApp: Partial<ActiveApplication> = {
            appId: app.appId,
            instanceId: Generic.generateUuid(),
            _ready: false 
        };

        if (!!options.dimensions) {
            newApp.dimensions = [
                Util.handleDimensionConversion(options.dimensions[0], 'x'),
                Util.handleDimensionConversion(options.dimensions[1], 'y')
            ]
        } else {
            newApp.dimensions = (
                app.dimensions !== undefined
                    ? [
                        Util.handleDimensionConversion(app.dimensions[0], 'x'),
                        Util.handleDimensionConversion(app.dimensions[1], 'y')
                    ]
                    : [300, 300]
            )
        }

        if (!!options.positions) {
            newApp.positions = [
                Util.handlePositionConversion(options.positions[0], 'x', newApp.dimensions[0]),
                Util.handlePositionConversion(options.positions[1], 'y', newApp.dimensions[1])
            ]
        } else {
            newApp.positions = [25  * (contentLen + 1), 25];
        }

        if (!!options._visibility) {
            newApp._visibility = options._visibility
        } else {
            newApp._visibility = 'DEFAULT'
        }

        return { ...newApp } as ActiveApplication
        // return {
        //     appId: app.appId,
        //     instanceId: Generic.generateUuid(),
        //     positions: (
        //         options?.positions
        //             ? options.positions
        //             : [25  * (contentLen + 1), 25]
        //     ),
        //     dimensions: (
        //         app.dimensions !== undefined
        //             ? [
        //                 Util.handleDimensionConversion(app.dimensions[0], 'x'),
        //                 Util.handleDimensionConversion(app.dimensions[1], 'y')
        //             ]
        //             : [300, 300]
        //     ),
        //     _visibility: (
        //         options?._visibility
        //             ? options._visibility
        //             : 'DEFAULT'
        //     ),
        //     _ready: false
        // }
    } catch (err) {
        console.log(err)
        if (err instanceof Error) {
            return err
        } else {
            return new Error('Unhandled exception when trying to open window');
        }
    }
}
