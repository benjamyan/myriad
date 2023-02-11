import { applicationDefaultValues ,DefaultApplicationValues } from "../../config/applications/applicationDefaults";
import { ApplicationDefinition } from "../../types";

type ApplicationFactoryProps = (
    Pick<ApplicationDefinition, 'appId' | 'displayName' | 'sourceType'> & Partial<ApplicationDefinition>
);

export const applicationItem = (givenProps: ApplicationFactoryProps, ignoreDefaults?: Array<keyof ApplicationDefinition>): ApplicationDefinition => {
    let applicationDefinition = {
        ...applicationDefaultValues,
        ...givenProps
    };
    
    let typedKey: keyof DefaultApplicationValues = null!;
    for (const key in applicationDefaultValues) {
        typedKey = key as keyof DefaultApplicationValues;
        if (givenProps[typedKey] && ignoreDefaults?.includes(typedKey)) {
            // @ts-expect-error
            applicationDefinition[typedKey] = {
                ...applicationDefaultValues[typedKey],
                ...applicationDefinition[typedKey]
            }
        } else {
            // @ts-expect-error
            applicationDefinition[typedKey] = { ...applicationDefaultValues[typedKey] };
        }
    }
    
    return applicationDefinition
}
