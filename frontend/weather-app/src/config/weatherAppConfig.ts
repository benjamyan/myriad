import { WeatherApiRequestParams, WeatherAppOptionalApiRequestOptions } from "../types";

export const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast';

export const defaultWeatherApiRequestParams: Pick<WeatherApiRequestParams, 'current_weather' | 'temperature_unit'> = {
        current_weather: true,
        temperature_unit: 'fahrenheit'
}

export const buildWeatherApiRequestParams = (requestArgs: WeatherAppOptionalApiRequestOptions): WeatherApiRequestParams => {
    let weatherApiParams: Partial<WeatherApiRequestParams> = { 
        ...defaultWeatherApiRequestParams,
        ...requestArgs
    };

    if (!requestArgs.unit || requestArgs.unit === 'F') {
        weatherApiParams.temperature_unit = defaultWeatherApiRequestParams.temperature_unit
    } else {
        weatherApiParams.temperature_unit = 'celsius'
    }

    return { ...weatherApiParams } as WeatherApiRequestParams
}

// export const weatherApp = {
//     appId: 'weather',
//     displayName: 'Weather',
//     sourceType: 'JSON',
//     sourceContent: JSON.stringify({
//         "latitude": 39.96187,
//         "longitude": -75.155365,
//         "generationtime_ms": 0.2759695053100586,
//         "utc_offset_seconds": 0,
//         "timezone": "GMT",
//         "timezone_abbreviation": "GMT",
//         "elevation": 20.0,
//         "current_weather": {
//             "temperature": 58.0,
//             "windspeed": 11.5,
//             "winddirection": 194.0,
//             "weathercode": 0,
//             "time": "2022-12-30T20:00"
//         }
//     }),
//     // sourceUrl: 'https://api.open-meteo.com/v1/forecast',
//     // sourceConfig: {
//     //     params: {
//     //         // https://open-meteo.com/en
//     //         latitude: 39.9509,
//     //         longitude: -75.1575,
//     //         current_weather: true,
//     //         temperature_unit: 'fahrenheit'
//     //         // hourly: 'temperature_2m'
//     //     }
//     // },
//     renderContent: WeatherApp,
//     dimensions: ['33%', '33%']
// }