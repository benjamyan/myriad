import * as React from 'react';

/* 
0	Clear(No cloud at any level)
1	Partly cloudy(Scattered or broken)
2	Continuous layer(s) of blowing snow
3	Sandstorm, duststorm, or blowing snow
4	Fog, thick dust or haze
5	Drizzle
6	Rain
7	Snow, or rain and snow mixed
8	Shower(s)
9	Thunderstorm(s)


{
    "latitude": 39.96187,
    "longitude": -75.155365,
    "generationtime_ms": 0.2690553665161133,
    "utc_offset_seconds": 0,
    "timezone": "GMT",
    "timezone_abbreviation": "GMT",
    "elevation": 20,
    "current_weather": {
        "temperature": 31.4,
        "windspeed": 12.8,
        "winddirection": 286,
        "weathercode": 0,
        "time": "2022-12-20T03:00"
    }
}

*/

export const WeatherApp = (content: string, options: Record<string, any>)=> {
    // console.log(content);
    // console.log(options);
    return (
        <div>
            <div>

            </div>
            <div>
                <h3>{  }</h3>
            </div>
        </div>
    )
}
