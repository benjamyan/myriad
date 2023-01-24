import * as React from 'react';
import * as wi from 'react-icons/wi';
import * as ai from 'react-icons/ai';
import * as fa from 'react-icons/fa';

import { Wrapper } from 'myriad-ui';

import { iconFromWeatherCode } from '../../utils';
import { MyriadFrontendComponentOptions, WeatherAppContentDefinition } from '../../types';

// import 'myriad-ui/lib/utils/styles/styles.scss';
import './_WeatherWidget.scss';

export interface MyriadFrontendWidgetProps extends Pick<MyriadFrontendComponentOptions, 'insertComponent'> {
    /** The frontends top-level classname */
    appClassName: string;
    /** Optionally you can pass a classname from the parent to _override_ the default widget classname 
     * @if provided: "`{ widgetClassName }`"
     * @else "`{ appClassName }_widget` "
     * 
     * @important Regardless if its given or not, the top-most parent will always have the "`{ appClassName }_widget` " included
     */
    widgetClassName?: string;
}
export interface WeatherWidgetProps {
    weatherData: WeatherAppContentDefinition;
}

let widgetParentClassname = 'DEFAULT_widgetParentClassname',
    widgetClassName = 'DEFAULT_widgetClassName';

export const WeatherWidget = (props: WeatherWidgetProps & MyriadFrontendWidgetProps)=> {
    const { weatherData, appClassName, insertComponent } = props;

    widgetParentClassname = appClassName + '_widget';
    widgetClassName = widgetParentClassname;
    if (props.widgetClassName !== undefined) {
        widgetClassName = props.widgetClassName;
    }

    if (weatherData !== undefined && weatherData.current_weather !== undefined) {
        return (
            <>
                { insertComponent?.BeforeBegin !== undefined &&
                    insertComponent.BeforeBegin
                }
                <section className={widgetParentClassname}>
                    { insertComponent?.AfterBegin !== undefined &&
                        insertComponent.AfterBegin
                    }
                    {/* <nav className={`${widgetClassName}--nav`}>
                        <h5 className={`${widgetClassName}--nav-location`}>
                            <span>Usercitynamegoeshere</span> ST.
                        </h5>
                        <div className={`${widgetClassName}--nav-config`}>
                            <fa.FaCog />
                            <ai.AiFillPushpin />
                        </div>
                    </nav> */}
                    <header className={`${widgetClassName}--header`}>
                        <div className={`${widgetClassName}--header-icon`}>
                            <Wrapper.Icon icon={ iconFromWeatherCode(weatherData.current_weather.weathercode) } />
                        </div>
                        <div className={`${widgetClassName}--header-temp`}>
                            <h1>
                                { weatherData.current_weather.temperature }<sup><b>&#xb0;</b></sup>
                                <span>fahrenheit</span>
                            </h1>
                        </div>
                    </header>
                    <aside className={`${widgetClassName}--data`}>
                        <p><span>condition</span><b>sunny</b></p>
                        <p><span>wind</span><b>{ weatherData.current_weather.windspeed } m/h</b></p>
                    </aside>
                    { insertComponent?.BeforeEnd !== undefined &&
                        insertComponent.BeforeEnd
                    }
                </section> 
                { insertComponent?.AfterEnd !== undefined &&
                    insertComponent.AfterEnd
                }
            </>

        )
    }
    return <></>
}
