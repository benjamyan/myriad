import { applicationDefaultValues } from "../../../config/applications/applicationDefaults";
import { ActiveApplication, ApplicationDefinition, ApplicationDomOptions, ApplicationDomOptionsValue, ApplicationDomOptionType, ApplicationDomPositionOptions, ApplicationDomPositionOptionsValue, ApplicationDomValueCalculated } from "../../../types";
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

/**
 * @typedef CalculationType 
 */

/** 
 * @function calculateRenderKey
 * @param givenValues an object containing the `ApplicationDefinitions` dimensions or position properties
 * @param axis should be the axis being calculcated against (eg. X or Y)
 * @param {String} type @see {@link calculateDomRenderValue} 
 * @returns 
 * - `number` represnting the closest `x | y` key number. IE if your screen width is 600px and the definition declared an `x700` value, it will return `700`
 * - `null` if no match is found 
 * */
export const calculateRenderKey = (givenValues: ApplicationDomOptions | ApplicationDomPositionOptions, axis: 'x' | 'y', type: ApplicationDomOptionType) => {
    let calculatedDomValue: number | null = null,
        derivedDomPropertyValue: number,
        currentValue: number;

    /** Set the derived DOM refernce value to be calculated against based on the given property */
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
    for (const axisKey in givenValues) {
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
}

interface CalculateDomRenderValueBaseProps<T extends ApplicationDomOptionType> {
    valueOptions: NonNullable<ApplicationDefinition[T]>;
    additionalValue: ApplicationDomValueCalculated | null;
    geometricType: T;
}
export type CalculateDomRenderValuePropsActual<T extends ApplicationDomOptionType> = (
    T extends 'positions' 
        ? CalculateDomRenderValueBaseProps<T> & {
            applicationDimensions: ApplicationDomValueCalculated;
        } 
        : CalculateDomRenderValueBaseProps<T>
)

/**
 * @function calculateDomRenderValue will take the predefined `dimensions` & `positions` properties in an `ApplicationDefinition` and calculate its given values based on the current window shape
 * @param valueOptions <0> an object containing the `ApplicationDefinitions` dimensions or position properties
 * @param additionalValue <1> If you need to check against an already existing (calculated) value, provide it here. The function will append it to the given `valueOptions` param with the key of `{x | y}${window.innerWidth}`
 * @param geometricType <2> The property type key in `ApplicationDefinitions` (`dimensions` | `positions`). If you're using `positions`, 
 * @param applicationDimensions <[3]> required if youre trying to calculate position. Needs to be a _parsed_ value for the application windows dimensional values (`[w, h]`)
 * @returns a Tuple<number> with a length of 2 that will be used to render the positions or dimensions or an applications window  
 * 
 * @todo 
 * - Support `y` axis calculations for dimensions
 * - Allow previous values set by user (application resizing or dragging) to be factores into final calculation 
 */
export function calculateDomRenderValue<T extends ApplicationDomOptionType>(givenProps: CalculateDomRenderValuePropsActual<T>) {
    const { valueOptions, additionalValue, geometricType } = givenProps;
    const applicationDimensions = (
        geometricType === 'positions' 
            ? givenProps.applicationDimensions 
            : undefined
    );
    const handleDomCalculationConversion = (): [number, number] => {
        let calculatedDomValue: [number, number] = null!;
        if (geometricType === 'dimensions' || applicationDimensions === undefined) {
            calculatedDomValue = [
                Generic.handleDomValueConversion(parsedDomValues[0], 'x'),
                Generic.handleDomValueConversion(parsedDomValues[1], 'y')
            ];
        } else {
            calculatedDomValue = [
                Generic.handlePositionConversion(parsedDomValues[0], 'x', applicationDimensions[0]),
                Generic.handlePositionConversion(parsedDomValues[1], 'y', applicationDimensions[1])
            ];
        }
        return calculatedDomValue
    }
    
    let // domValuesToParse = valueOptions,
        domValuesToParse = (
            additionalValue === null
                ? valueOptions
                : {...valueOptions, [`x${window.innerWidth}`]: additionalValue}
        ),
        parsedDomValues: ApplicationDomOptionsValue | ApplicationDomPositionOptionsValue = null!,
        renderKeyValue = calculateRenderKey(domValuesToParse, 'x', geometricType);
    
    // if (additionalValue !== null) {
    //     const getDerivedContrastValue = (givenValues: ApplicationDomValueCalculated)=> givenValues.map( (value, index)=> {
    //         if (typeof(value) === 'string') {
    //             if (value.indexOf('px') > -1) {
    //                 return Generic.handleDomValueConversion(value.substring(0, value.length - 2), index === 0 ? 'x' : 'y')
    //             }
    //             return Generic.handleDomValueConversion(value, index === 0 ? 'x' : 'y')
    //         }
    //         return value
    //     });
    //     let derivedContrastValue,
    //         temp;
    //     if (geometricType === 'dimensions') { 
    //         derivedContrastValue = getDerivedContrastValue(additionalValue)
    //         if (derivedContrastValue[0] < window.innerWidth && derivedContrastValue[1] < window.innerHeight) {
    //             return additionalValue
    //         }
    //     } else if (applicationDimensions !== undefined) {
    //         derivedContrastValue = getDerivedContrastValue(additionalValue)
    //         temp = getDerivedContrastValue(applicationDimensions)
    //         if (derivedContrastValue[0] + temp[0] < window.innerWidth && derivedContrastValue[1] + temp[1] < window.innerHeight) {
    //             return additionalValue
    //         }
    //     }
    // }

    if (!domValuesToParse || typeof(domValuesToParse) !== 'object') {
        domValuesToParse = applicationDefaultValues[geometricType]
    }
    
    if (Object.keys(domValuesToParse).length === 1) {
        /** If the only one option present is `default` do nothing */
        parsedDomValues = domValuesToParse.default;
    } else {
        if (typeof(renderKeyValue) !== 'number' || renderKeyValue === null) {
            /** Unhandled exception when trying to calculate the render value - return the default value */
            // console.warn(`Unhandled exception when attempting to calculate the DOM render options key`);
            parsedDomValues = domValuesToParse.default;
        } else {
            parsedDomValues = domValuesToParse[`x${renderKeyValue}`]
        }
        
        if (parsedDomValues === null) {
            /** Something went wrong - throw an exception, but render using default values from config */
            console.warn(`Failed to parse value - reverting to default`);
            parsedDomValues = applicationDefaultValues[geometricType].default;
            // return applicationDefaultValues[geometricType].default;
        }
        if (parsedDomValues.length !== 2) {
            console.warn(`Parsed values exceeded acceptable length. Expected length of 2, but received ${parsedDomValues.length}. Using first two values.`);
            parsedDomValues = [
                parsedDomValues[0],
                parsedDomValues[1]
            ]
        }
        if (parsedDomValues.includes('default')) {
            /** 
             * Parse the default value and insert it by key by reversed array 
             * so TS can correctly parse the constant length being enforced.
             */
            for (let i = parsedDomValues.length - 1; i >= 0; i--) {
                if (typeof(parsedDomValues[i]) === 'string' && (parsedDomValues[i] as string).indexOf('%') === -1) {
                    /** The missing `%` sign indicates a key reference to the initial definition */
                    if (domValuesToParse[parsedDomValues[i] as keyof ApplicationDomOptions] !== undefined) {
                        /** Pass in the value as a key of the initial definition and reference the correct index signature */
                        parsedDomValues[i] = domValuesToParse[parsedDomValues[i] as keyof ApplicationDomOptions][i];
                    }
                }
            }
        }
    }
    
    return handleDomCalculationConversion()
}
