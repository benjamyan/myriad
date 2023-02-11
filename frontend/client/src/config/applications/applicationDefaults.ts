import { TsUtil, ApplicationDefinition, ApplicationDomOptions, ApplicationDomPositionOptions } from "../../types"

const defaultApplicationDimensions: ApplicationDomOptions = {
    default: [ 300, 300 ],
    x1100: [ '50%', '30%' ],
    x900: [ '50%', '40%' ],
    x600: [ '100%', '40%' ]
}
const defaultApplicationPositions: ApplicationDomPositionOptions = {
    default: [25, 25],
    x800: [ 0,0 ]
}

export type DefaultApplicationValues = {
    [Property in keyof Required<Pick<ApplicationDefinition, 'dimensions' | 'positions'>>]: NonNullable<ApplicationDefinition[Property]>;
};
const applicationDefaultValues: DefaultApplicationValues = {
    dimensions: defaultApplicationDimensions,
    positions: defaultApplicationPositions
}

export {
    applicationDefaultValues
}