import * as React from 'react';
import { default as Axios } from 'axios';

import { MyriadFrontendOptions, WeatherAppContentDefinition, WeatherAppOptionalApiRequestOptions } from '../types';
import { WeatherWidget } from './Widget/WeatherApp.Widget';
import { buildWeatherApiRequestParams, weatherApiUrl } from '../config';

// import './_WeatherApp.scss';

const APP_CLASSNAME = 'weather__app';
export interface WeatherAppProps extends Omit<MyriadFrontendOptions, 'apiParams'> {
    apiParams?: WeatherAppOptionalApiRequestOptions;
}

export const WeatherApp = (weatherAppProps: WeatherAppProps)=> {
    const [ weatherData, setWeatherData ] = React.useState<WeatherAppContentDefinition>(null!);
    const [ myriadAppError, setMyriadAppError ] = React.useState<undefined | Error>(undefined);
    
    React.useEffect(()=>{
        if (!!weatherAppProps.componentData) {
            if (typeof(weatherAppProps.componentData) === 'string') {
                setWeatherData(JSON.parse(weatherAppProps.componentData) as typeof weatherData);
            } else {
                setWeatherData(weatherAppProps.componentData as typeof weatherData);
            }
        }
        if (!!weatherAppProps.overrideComponentApiData) {
            return
        } else {
            if (!weatherAppProps.apiParams) return;
            Axios(weatherApiUrl, {
                method: 'get',
                params: buildWeatherApiRequestParams(weatherAppProps.apiParams)
            })
                .then((res)=> res.data)
                .then((data)=>{
                    console.log(data)
                    setWeatherData(data)
                })
                .catch((err)=> {
                    console.error(err);
                    setMyriadAppError(err);
                })
        }
    }, [])

    if (!weatherData) {
        return <>Loading...</>
    } else if (myriadAppError) {
        return <>{ JSON.stringify(myriadAppError) }</>
    } else if (!weatherAppProps.componentType || weatherAppProps.componentType === 'application') {
        return <>Weather application</>
    } else {
        console.log('show widget...')
        return (
            <WeatherWidget 
                appClassName={ APP_CLASSNAME } 
                weatherData={ weatherData } 
                insertComponent={ weatherAppProps.insertComponent }
                // PrependComponent={ weatherAppProps.PrependComponent }
                // AppendComponent={ weatherAppProps.AppendComponent }
            />
        )
    }
}

