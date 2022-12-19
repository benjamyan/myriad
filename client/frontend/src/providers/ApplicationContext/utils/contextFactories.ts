import { ActiveApplication, ApplicationDefinition } from "../../../types";
import * as Util from './appContextUtils';

export const newAppInContext = (props: ApplicationDefinition): ActiveApplication => ({
    appId: props.appId,
    // visibility: null,
    // isOpen: true,
    // isFullscreen: false,
    // userChanges: null,
    positions: [200, 150],
    // posX: 200,
    // posY: 150,
    dimensions: (
        props.dimensions !== undefined
            ? [
                Util.handleDimensionConversion(props.dimensions[0], 'x'),
                Util.handleDimensionConversion(props.dimensions[1], 'y')
            ]
            : [300, 300]
    ),
    // dimensionH: 300,
    // dimensionW: 300,
    // _isFocused: 0,
    _isVisible: true
})