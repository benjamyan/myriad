import { applicationDefaultValues } from "../../../config/applications/applicationDefaults";
import { ActiveApplication, ApplicationDefinition, ApplicationDomOptions, ApplicationDomOptionsValue, ApplicationDomOptionTypes } from "../../../types";
import { Generic } from "../../../utils";

/** Returns the index of the app that matches the suppled ID inside of the supplied array relative to our active context state 
 * @param givenArr The array you need to test against
 * @param id 
 * 
 * @returns 
 * @type {number} Indicating its position in the provided array
 * @if it does not exist, returns `-1`
 */
export const findAppIndexById = (givenArr: (ApplicationDefinition | ActiveApplication)[], id: string): number => {
    return givenArr.findIndex( arrItem=> arrItem.appId === id );
}

export const calculateRenderKey = (givenDimensions: ApplicationDomOptions, axis: 'x' | 'y', type: ApplicationDomOptionTypes) => {
    let calculatedDomValue: number | null = null,
        derivedDomPropertyValue: number,
        currentValue;
    if (type === 'dimensions') {
        derivedDomPropertyValue = (
            axis === 'x' ? window.innerWidth : window.innerHeight
        );
    } else {
        // console.warn('TODO')
        derivedDomPropertyValue = (
            axis === 'x' ? window.innerWidth : window.innerHeight
        );
    }
    for (const axisKey in givenDimensions) {
        if (axisKey.startsWith(axis)) {
            currentValue = parseInt(axisKey.split(axis)[1]);
            if (currentValue < derivedDomPropertyValue) {
                /** Dont parse values less than the windows current axis */
                continue;
            } else if (calculatedDomValue === null) {
                /** Initialize the container value and exit current iteration */
                calculatedDomValue = currentValue;
                continue
            } else if (currentValue - derivedDomPropertyValue < calculatedDomValue) {
                /** If the windows `innerWidth | innerHeight` negated by the current iterable is less than the current value in mem, use that instead */
                calculatedDomValue = currentValue;
            }
        }
    }
    return calculatedDomValue
    // return (
    //     calculatedDomValue === undefined 
    //         ? null 
    //         : givenDimensions[`${axis}${calculatedDomValue}`]
    // )
}

export const calculateDomRenderValue = (values: ApplicationDomOptions, type: ApplicationDomOptionTypes): [ApplicationDomOptionsValue,ApplicationDomOptionsValue] => {
    const domValuesToParse = (
        values === undefined
            ? applicationDefaultValues[type]
            : values as ApplicationDomOptions
    );
    /** If the only one present is `default` do nothing */
    if (Object.keys(domValuesToParse).length === 1) {
        return domValuesToParse.default;
    }
    let renderKeyValue = calculateRenderKey(domValuesToParse, 'x', type),
        parsedDomValues;
    if (renderKeyValue === null) {
        parsedDomValues = domValuesToParse.default;
    } else {
        parsedDomValues = domValuesToParse[`x${renderKeyValue}`]
    }
    
    if (parsedDomValues === null) {
        /** Something went wrong - throw an exception, but render using default values from config */
        console.warn(`Failed to parse value - reverting to default`);
        return applicationDefaultValues[type].default;
    } else if (parsedDomValues.length !== 2) {
        console.warn(`Parsed values exceeded acceptable length. Expected length of 2, but received ${parsedDomValues.length}. Using first two values.`)
        console.warn([...parsedDomValues])
        return [
            parsedDomValues[0],
            parsedDomValues[1]
        ]
    } else if (parsedDomValues.includes('default')) {
        /** Parse the default value and insert it by key
         * TODO add support for various key pairs
         */
        parsedDomValues = (
            parsedDomValues
                .map((value, index)=>{
                    if (typeof(value) !== 'number' && value.indexOf('%') === -1) {
                        /** The missing `%` sign indicates a key reference */
                        if (domValuesToParse[value as keyof ApplicationDomOptions] === undefined) {
                            return applicationDefaultValues[type].default[index] 
                        }
                        return domValuesToParse[value as keyof ApplicationDomOptions][index]
                    } 
                    return value
                })
                .filter(Boolean)
        )
    }
    
    return parsedDomValues as ActiveApplication[typeof type];

    // else if (parsedDomValues.width && parsedDomValues.height === null) {
    //     /** Check if the value in an array is referencing a sibling */
    //     if (typeof(parsedDomValues.width[0]) !== 'number' && parsedDomValues.width[0].indexOf('%') === -1) {
            
    //     }
    // } else {

    // }

}

// export const calculateDomRenderValue = (values: ApplicationDomOptions, type: ApplicationDomOptionTypes): [ApplicationDomOptionsValue,ApplicationDomOptionsValue] => {
//     const domValuesToParse = (
//         values === undefined
//             ? applicationDefaultValues[type]
//             : values as ApplicationDomOptions
//     )
//     // let parsedDomValues: Record<'x' | 'y', ApplicationDomOptions[any] | null> = {
//     //     x: null,
//     //     y: null
//     // };
//     // let parsedDomValues: {
//     //     x: ApplicationDomOptions[any],
//     //     y: ApplicationDomOptions[any]
//     // } = {
//     //     x: domValuesToParse.default,
//     //     y: null!
//     // };    
//     let parsedDomValues: ApplicationDomOptions[any] = ;
    
//     /** If the only one present is `default` do nothing */
//     if (Object.keys(domValuesToParse).length === 1) {
//         parsedDomValues = {
//             x: domValuesToParse.default,
//             y: null
//         };
//     } else if (Object.keys(domValuesToParse).length > 1) {
//         parsedDomValues = {
//             x: calculateRenderKey(domValuesToParse, 'x'),
//             y: calculateRenderKey(domValuesToParse, 'y')
//         };
//     }

//     if (parsedDomValues.x.includes('default')) {
//         /** TODO fix the error checking happening here */
//         // /@ts-expect-error
//         parsedDomValues.x = (
//             parsedDomValues.x
//                 .map((value, index)=>{
//                     if (index > 1) return false
//                     if (typeof(value) !== 'number' && value.indexOf('%') === -1) {
//                         /** The missing `%` sign indicates a key reference */
//                         if (domValuesToParse[value as keyof ApplicationDomOptions] === undefined) {
//                             return applicationDefaultValues[type].default[index] 
//                         }
//                         return domValuesToParse[value as keyof ApplicationDomOptions][index]
//                     } 
//                     return value
//                 })
//                 .filter(Boolean)
//         )
//     }

//     if (parsedDomValues.x === null) {
//         /** Something went wrong - throw an exception, but render using default values from config */
//         console.warn(`Failed to parsed width value - reverting to default`);
//         parsedDomValues.x = applicationDefaultValues[type].default;
//     } else if (parsedDomValues.x.length !== 2) {
//         console.warn(`Parsed values exceeded acceptable length. Expected length of 2, but received ${parsedDomValues.x.length}. Using first two values.`)
//         console.warn([...parsedDomValues.x])
//         return [
//             parsedDomValues.x[0],
//             parsedDomValues.x[1]
//         ]
//     }
//     return parsedDomValues.x as ActiveApplication[typeof type];

//     // else if (parsedDomValues.width && parsedDomValues.height === null) {
//     //     /** Check if the value in an array is referencing a sibling */
//     //     if (typeof(parsedDomValues.width[0]) !== 'number' && parsedDomValues.width[0].indexOf('%') === -1) {
            
//     //     }
//     // } else {

//     // }

// }
