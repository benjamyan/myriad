import { ActiveApplication, ApplicationDefinition } from "../../../types";

/** Returns the index of the app that matches the suppled ID inside of the supplied array */
export const findAppIndexById = (givenArr: (ApplicationDefinition | ActiveApplication)[], id: string): number => {
    return givenArr.findIndex( arrItem=> arrItem.appId === id );
}

// export const findAppDefinition = (givenArr: Record<string, any>, id: string): number => {
//     return givenArr.findIndex( arrItem=> arrItem.appId === id );
// }

export const moveAppByIndex = ()=> {
    //
}
