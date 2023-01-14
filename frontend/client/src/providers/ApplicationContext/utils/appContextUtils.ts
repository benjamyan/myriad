import { ActiveApplication, ApplicationDefinition } from "../../../types";

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

// export const findAppDefinition = (givenArr: Record<string, any>, id: string): number => {
//     return givenArr.findIndex( arrItem=> arrItem.appId === id );
// }

export const moveAppByIndex = ()=> {
    //
}

export const handleDimensionConversion = (value: string | number, axis: 'x' | 'y'): number => {
    if (typeof(value) === 'string' && value.indexOf('%') > -1) {
        const percentage: number = parseInt(value.substring(0, value.length - 1));
        if (axis === 'x') {
            return ( window.innerWidth *  percentage) / 100
        } else {
            return ( window.innerHeight * percentage ) / 100
        }
    } else {
        return value as number
    }
}

