import { ActiveApplication, ApplicationDefinition, ApplicationDomOptions, ApplicationDomOptionsValue } from "../../../types";
import { applications } from "../../../config";
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
            _ready: false,
            _controlled: false
        };
        const predefinedValues: Pick<ApplicationDefinition, 'dimensions' | 'positions'> = {
            dimensions: (
                app.dimensions || applications.applicationDefaultValues.dimensions
            ),
            positions: (
                app.positions || applications.applicationDefaultValues.positions
            )
        }

        newApp.dimensions = calculateDomRenderValue({
            valueOptions: predefinedValues.dimensions as ApplicationDomOptions,
            additionalValue: options.dimensions !== undefined ? options.dimensions : null, 
            geometricType: 'dimensions'
        });
        
        if (app.positions !== undefined) {
            newApp.positions = calculateDomRenderValue({
                valueOptions: predefinedValues.positions as ApplicationDomOptions, 
                geometricType: 'positions', 
                additionalValue: options.positions !== undefined ? options.positions : null,
                applicationDimensions: newApp.dimensions
            });
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
