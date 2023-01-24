// import { IconType } from 'react/icons'
// import * as wi from 'react-icons/wi';
// import * as ai from 'react-icons/ai';
// import * as fa from 'react-icons/fa';
import { svg, SvgIcon } from 'myriad-icon';
import { WeatherAppContentDefinition } from '../types';

export const conditionFromWeatherCode = (weatherCode: WeatherAppContentDefinition['current_weather']['weathercode'])=> {
    switch (weatherCode) {
        case 0: {
            // Clear(No cloud at any level)
            return 'Clear'
        }
        case 1: {
            // Partly cloudy(Scattered or broken)
            return 'Partly cloudy'
        }
        case 2: {
            // Continuous layer(s) of blowing snow
            return 'Snow'
        }
        case 3: {
            // Sandstorm, duststorm, or blowing snow
            return 'Low visibility'
        }
        case 4: {
            // Fog, thick dust or haze
            return 'Hazy'
        }
        case 5: {
            // Drizzle
            return 'Drizzle'
        }
        case 6: {
            // Rain
            return 'Rain'
        }
        case 7: {
            // Snow, or rain and snow mixed
            return 'Mixed rain'
        }
        case 8: {
            // 8 Shower(s)
            return 'Showers'
        }
        case 9: {
            // Thunderstorm(s)
            return 'Thunderstorm'
        }
        default: {
            console.error(`Case for given weather code (${weatherCode}) not found`);
            return 'Unknown'
        }
    }  
}

export const iconFromWeatherCode = (weatherCode: number, isDaytime?: boolean): SvgIcon => {
    switch (weatherCode) {
        case 0: {
            // Clear(No cloud at any level)
            return !!isDaytime ? svg.sunSo : svg.moonSo
            // return isDaytime ? wi.WiDaySunny : wi.WiNightClear
        }
        case 1: {
            // Partly cloudy(Scattered or broken)
            return svg.cloudSunSo 
            // return isDaytime ? wi.WiDaySunnyOvercast : wi.WiNightAltCloudy
        }
        case 2: {
            // Continuous layer(s) of blowing snow
            return svg.lightSnowSo
            // return isDaytime ? wi.WiDaySnow : wi.WiNightSnow
        }
        case 3: {
            // Sandstorm, duststorm, or blowing snow
            return svg.windSo
            // return wi.WiSandstorm
        }
        case 4: {
            // Fog, thick dust or haze
            return svg.cloudySo
            // return wi.WiFog
        }
        case 5: {
            // Drizzle
            return svg.rainSo
            // return wi.WiRain
        }
        case 6: {
            // Rain
            return svg.waterDropSo
            // return isDaytime ? wi.WiDayRain : wi.WiNightRain
        }
        case 7: {
            // Snow, or rain and snow mixed
            return svg.umbrellaSo
            // return isDaytime ? wi.WiRainMix : wi.WiNightRainMix
        }
        case 8: {
            // 8 Shower(s)
            return svg.heavySnowSo
        }
        case 9: {
            // Thunderstorm(s)
            return svg.thunderStormSo
        }
        default: {
            console.error(`Case for given weather code (${weatherCode}) not found`)
            return svg.cloudySo
        }
    }        
}
