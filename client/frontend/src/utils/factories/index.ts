import { ActiveApplication, ApplicationDefinition } from '../../types';

export const newAppInContext = (appId: string): ActiveApplication => ({
    appId,
    // visibility: null,
    // isOpen: true,
    // isFullscreen: false,
    // userChanges: null,
    positions: [200, 150],
    // posX: 200,
    // posY: 150,
    dimensions: [300, 300],
    // dimensionH: 300,
    // dimensionW: 300,
    // _isFocused: 0,
    _isVisible: true
})
