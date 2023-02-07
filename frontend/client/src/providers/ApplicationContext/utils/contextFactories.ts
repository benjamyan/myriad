import { ActiveApplication, ApplicationDefinition } from "../../../types";
import { applicationDefaultValues } from "../../../config/applications/applicationDefaults";
import { Generic } from '../../../utils';
import { calculateDomRenderValue } from "./appContextUtils";

/** Factory function to build and return an applications object to be used in ApplicationContext
 * @param app 
 * @param contentLen
 * @param options Optional parameters you can send along with the dispatch function to override the default `applicationDefinition`
 * 
 */
export const newAppInContext = (app: ApplicationDefinition, contentLen: number, options: Partial<ActiveApplication>): ActiveApplication | Error => {
    try {
        const newApp: Partial<ActiveApplication> = {
            appId: app.appId,
            instanceId: Generic.generateUuid(),
            _ready: false 
        };
        
        if (!!options.dimensions) {
            newApp.dimensions = [
                Generic.handleDomValueConversion(options.dimensions[0], 'x'),
                Generic.handleDomValueConversion(options.dimensions[1], 'y')
            ]
        } else if (app.dimensions !== undefined) {
            newApp.dimensions = calculateDomRenderValue(app.dimensions, 'dimensions');
        } else {
            newApp.dimensions = applicationDefaultValues.dimensions.default;
        }

        if (!!options.positions) {
            newApp.positions = [
                Generic.handlePositionConversion(options.positions[0], 'x', newApp.dimensions[0]),
                Generic.handlePositionConversion(options.positions[1], 'y', newApp.dimensions[1])
            ]
        } else if (app.positions !== undefined) {
            const calculatedPositions = calculateDomRenderValue(app.positions, 'positions');
            newApp.positions = [
                Generic.handlePositionConversion(calculatedPositions[0], 'x', newApp.dimensions[0]),
                Generic.handlePositionConversion(calculatedPositions[1], 'y', newApp.dimensions[1])
            ]
        } else {
            console.log(3)
            newApp.positions = [
                25  * (contentLen + 1), 
                25
            ];
        }

        if (!!options._visibility) {
            newApp._visibility = options._visibility
        } else {
            newApp._visibility = 'DEFAULT'
        }

        return { ...newApp } as ActiveApplication;
    } catch (err) {
        console.log(err)
        if (err instanceof Error) {
            return err
        } else {
            return new Error('Unhandled exception when trying to open window');
        }
    }
}
