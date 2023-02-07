export const handleDomValueConversion = (value: string | number, axis: 'x' | 'y'): number => {
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
        case 'bottom': {
            return window.innerHeight - handleDomValueConversion(dimension, axis) - 42
        }
        case 'middle': {
            if (axis === 'x') {
                return (window.innerWidth - handleDomValueConversion(dimension, axis)) / 2
            } else {
                return (window.innerHeight - handleDomValueConversion(dimension, axis)) / 2
            }
        }
        case 'right': {
            return window.innerWidth - handleDomValueConversion(dimension, axis)
        }
        case 'left': {
            return 0
        }
        default: {
            return value as number
            // if (typeof(value) === 'string') {
            //     const percentage: number = parseInt(value.substring(0, value.length - 1));
            //     if (axis === 'x') {
            //         return ( window.innerWidth *  percentage) / 100
            //     } else {
            //         return ( window.innerHeight * percentage ) / 100
            //     }
            // } else {
            //    return value as number
            // }
        }
    }
}