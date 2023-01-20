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

export const handlePositionConversion = (value: string | number, axis: 'x' | 'y', dimension: string | number): number => {
    switch (value) {
        case 'top': {
            
            return 0
        }
        // case 'bottom': {
        //     // window.innerHeight - 42 - $0.clientHeight
        //     return 0
        // }
        case 'middle': {
            console.log('middle')
            console.log(axis)
            console.log(handleDimensionConversion(dimension, axis))
            if (axis === 'x') {
                return (window.innerWidth - handleDimensionConversion(dimension, axis)) / 2
            } else {
                return (window.innerHeight - handleDimensionConversion(dimension, axis)) / 2
            }
        }
        case 'right': {
            // window.innerWidth - $0.offsetWidth
            return window.innerWidth - handleDimensionConversion(dimension, axis)
        }
        case 'left': {

            return 0
        }
        default: {
            // if (typeof(value) === 'string') {
            //     const percentage: number = parseInt(value.substring(0, value.length - 1));
            //     if (axis === 'x') {
            //         return ( window.innerWidth *  percentage) / 100
            //     } else {
            //         return ( window.innerHeight * percentage ) / 100
            //     }
            // } else {
                return value as number
            // }
        }
    }
}

