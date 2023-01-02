import { default as Axios } from "axios";
import { applications } from "../../config";
import { ApplicationDefinition } from "../../types";

export type ApplicationDataLoaderProps = {
    appId: ApplicationDefinition['appId']
}

export type ApplicationDataSiloEntry = string | JSON | Error;

export const applicationContextData: Map<string, ApplicationDataSiloEntry> = new Map();

export const updateAppContextData = (appId: string, content: JSON | string): ApplicationDataSiloEntry => {
    /** Handle validation and whatnot here */
    try {
        applicationContextData.set(appId, content)
    } catch (err) {
        console.log(err)
    } finally {
        return applicationContextData.get(appId) || new Error(`Item not found in application data silo: ${appId}`)
    }
}

export const applicationDataLoader = async (props: ApplicationDataLoaderProps): Promise<ApplicationDataSiloEntry> => {
    try {
        const appDefinition = applications.appItemsById[props.appId];
        
        if (appDefinition.sourceContent !== undefined) {
            return updateAppContextData(props.appId, appDefinition.sourceContent)
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
                return updateAppContextData(props.appId, remoteContent);
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
