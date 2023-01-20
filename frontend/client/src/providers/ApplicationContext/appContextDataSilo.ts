import { default as Axios } from "axios";
import { applications } from "../../config";
import { ApplicationDefinition } from "../../types";
import { AppContextState, ApplicationDataSiloEntry } from "./types";

export type ApplicationDataLoaderProps = {
    appContextData: AppContextState['bucket'];
    appId: ApplicationDefinition['appId']
}
// export const applicationContextData: Map<string, ApplicationDataSiloEntry> = new Map();

// export const updateAppContextData = (appId: string, content: JSON | string): ApplicationDataSiloEntry => {
export const updateAppContextData = (appContextData: AppContextState['bucket'], updates: { appId: ApplicationDefinition['appId'], content: JSON | string }): ApplicationDataSiloEntry => {
    /** Handle validation and whatnot here */
    try {
        appContextData.current.set(updates.appId, updates.content)
    } catch (err) {
        console.trace()
        if (err instanceof Error) {
            return err
        } else {
            return new Error(`Unhandled exception on appId: ${updates.appId}`)
        }
    } finally {
        return appContextData.current.get(updates.appId) || new Error(`Item not found in application data silo: ${updates.appId}`)
    }
}

export const applicationDataLoader = async (props: ApplicationDataLoaderProps): Promise<ApplicationDataSiloEntry> => {
    try {
        const appDefinition = applications.appItemsById[props.appId];
        
        if (appDefinition.sourceContent !== undefined) {
            return updateAppContextData(props.appContextData, {
                appId: props.appId, 
                content: appDefinition.sourceContent
            })
        } else if (appDefinition.sourceUrl !== undefined && appDefinition.sourceUrl.length > 0) {
            const remoteContent = await Axios(appDefinition.sourceUrl, appDefinition.sourceConfig || {})
                .then((res)=> {
                    return res.data
                })
                .catch((err)=> {
                    console.error(err)
                    return false
                });
            if (!!remoteContent) {
                return updateAppContextData(props.appContextData, {
                    appId: props.appId, 
                    content: remoteContent
                })
                // return updateAppContextData(props.appId, remoteContent);
            }
            throw new Error(`Unhandled exception fetching remote content`);
        } else {
            throw new Error(`No source to draw from`);
        }
    } catch (err) {
        console.log(err)
        return err instanceof Error ? err : new Error('Unhandled exception loadiing application data')
    }
}
