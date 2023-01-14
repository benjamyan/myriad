import { ApplicationDefinition } from '../../types';

import * as appItems from './applicationDefinitions';

type AppsById = {
    [key: string]: ApplicationDefinition
};
const appItemsById = function() {
    const appsById: AppsById = {};
    
    /** 
     * Because an mvp only needs a 3d array with a depth of 1, this will do for now. 
     * In the future, should be able to recursively shake down the provided 3-dimensional array.
     */
    for (const app of Object.values(appItems)) {
        if (Array.isArray(app)) {
            app.forEach(
                (appItem)=>appsById[appItem.appId] = appItem
            );
        } else {
            appsById[app.appId] = app
        }
    }

    return appsById
}()

const applications = appItems;

// const applications = {
//     get appItemsById() {

//     }
// }

export default appItems;
export {
    appItemsById
}
