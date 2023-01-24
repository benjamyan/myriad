import { MyriadFrontendOptions } from ".";

export interface WeatherApiRequestParams {
    latitude: number;
    longitude: number;
    current_weather: boolean;
    temperature_unit: 'fahrenheit' | 'celsius';
}

export interface WeatherAppContentDefinition {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: 0,
    timezone: string,
    timezone_abbreviation: string,
    elevation: number,
    current_weather: {
        temperature: number,
        windspeed: number,
        winddirection: number,
        /**
         * - 0	Clear(No cloud at any level)
         * - 1	Partly cloudy(Scattered or broken)
         * - 2	Continuous layer(s) of blowing snow
         * - 3	Sandstorm, duststorm, or blowing snow
         * - 4	Fog, thick dust or haze
         * - 5	Drizzle
         * - 6	Rain
         * - 7	Snow, or rain and snow mixed
         * - 8	Shower(s)
         * - 9	Thunderstorm(s)
         */
        weathercode: number,
        time: Date
    }
}

export interface WeatherAppOptionalApiRequestOptions extends Pick<MyriadFrontendOptions, 'apiParams'> {
    longitude: number;
    latitude: number;
    unit?: 'F' | 'C';
}

// export interface WeatherAppProps extends Omit<MyriadFrontendOptions, 'apiParams'> {
//     apiParams: WeatherAppOptionalApiRequestOptions;
// }
