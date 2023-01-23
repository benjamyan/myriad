import * as React from 'react';
import * as wi from 'react-icons/wi';
import * as ai from 'react-icons/ai';
import * as fa from 'react-icons/fa';

import { WeatherAppContentDefinition } from '../types';

import './_WeatherApp.scss';

const weatherClassName = 'weather__data';

export const conditionFromWeatherCode = (weatherCode: number)=> {
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
            return <></>
        }
    }  
}

export const IconFromWeatherCode = (props: { weatherCode: number })=> {
    const isDay = true;

    switch (props.weatherCode) {
        case 0: {
            // Clear(No cloud at any level)
            return isDay ? <wi.WiDaySunny /> : <wi.WiNightClear />
        }
        case 1: {
            // Partly cloudy(Scattered or broken)
            return isDay ? <wi.WiDaySunnyOvercast /> : <wi.WiNightAltCloudy />
        }
        case 2: {
            // Continuous layer(s) of blowing snow
            return isDay ? <wi.WiDaySnow /> : <wi.WiNightSnow />
        }
        case 3: {
            // Sandstorm, duststorm, or blowing snow
            return <wi.WiSandstorm />
        }
        case 4: {
            // Fog, thick dust or haze
            return <wi.WiFog />
        }
        case 5: {
            // Drizzle
            return <wi.WiRain />
        }
        case 6: {
            // Rain
            return isDay ? <wi.WiDayRain /> : <wi.WiNightRain />
        }
        case 7: {
            // Snow, or rain and snow mixed
            return isDay ? <wi.WiRainMix /> : <wi.WiNightRainMix />
        }
        case 8: {
            // 8 Shower(s)
            return <wi.WiShowers />
        }
        case 9: {
            // Thunderstorm(s)
            return isDay ? <wi.WiDayThunderstorm /> : <wi.WiNightThunderstorm />
        }
        default: {
            return <></>
        }
    }        
}

const WeatherDataContainer = (props: { content: WeatherAppContentDefinition })=> {
    const weather = props.content;
    
    return (
        <section className={`${weatherClassName}`}>
            <nav className={`${weatherClassName}--nav`}>
                <h5 className={`${weatherClassName}--nav-location`}>
                    <span>Usercitynamegoeshere</span> ST.
                </h5>
                <div className={`${weatherClassName}--nav-config`}>
                    <fa.FaCog />
                    <ai.AiFillPushpin />
                </div>
            </nav>
            <header className={`${weatherClassName}--header`}>
                <div className={`${weatherClassName}--header-icon`}>
                    <IconFromWeatherCode weatherCode={props.content.current_weather.weathercode} />
                </div>
                <div className={`${weatherClassName}--header-temp`}>
                    <h1>
                        { weather.current_weather.temperature }<sup><b>&#xb0;</b></sup>
                        <span>fahrenheit</span>
                    </h1>
                </div>
            </header>
            <aside className={`${weatherClassName}--data`}>
                <p><span>condition</span><b>sunny</b></p>
                <p><span>wind</span><b>{ weather.current_weather.windspeed } m/h</b></p>
            </aside>
        </section>
    )
}

export const WeatherWidget = (props: any)=> {
    if (props.content === 'OFFLOAD') {
        return <></>
    } else if (props.content === 'LOADING') {
        return <></>
    } else if (props.content instanceof Error) {
        return <></>
    } else {
        const weather = props.content as unknown as WeatherAppContentDefinition;
        if (weather !== undefined && weather.current_weather !== undefined) {
            return <WeatherDataContainer content={weather} />
        }
        return <></>
    }
}
