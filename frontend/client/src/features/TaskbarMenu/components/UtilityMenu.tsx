import React from 'react';
// import { BsCloudsFill } from 'react-icons/bs';
import { Button, Loader } from 'myriad-ui';
import { svg } from 'myriad-icons'

// import { Button, Loader } from '../../../components';
import { navigation } from '../../../config';
import { default as applications } from '../../../config/applications'
import { applicationDataLoader, useNavigationContext, useNavRef } from '../../../providers';
import { WeatherApp } from '../../';

import * as Time from '../utils/timeUtils';

type UtilityClockProps = {
    toggleConfigPane: ()=> void;
}

const utilBtnClassName = 'utility__button';
const utilPaneClassName = 'utility__pane';

const WeatherPane = ()=> {
    const { navContextState, navContextUpdate } = useNavigationContext();
    const { navRef, setNavMenuRef, setNavTriggerRef } = useNavRef();
    
    const [ weatherData, setWeatherData ] = React.useState<JSON | Error>(undefined!);
    const [ panelLocation, setPanelLocation ] = React.useState<[number, number]>([0,0]);
    // const weatherIconRef = React.useRef<HTMLButtonElement>(null!);

    const WeatherPaneContent = React.useCallback(
        ()=> {
            if (weatherData === undefined) {
                return <Loader.Hourglass />
            } else if (weatherData instanceof Error) {
                return <>err</>
            } else {
                return <WeatherApp content={weatherData} />
            }
        },
        [ weatherData ]
    );

    React.useEffect(()=>{
        // navContextUpdate({
        //     type: 'SELECT',
        //     payload: {
        //         id: navigation.utilityMenuItems.weather.menuId,
        //         nodes: navRef
        //     }
        // })
        
        if (weatherData === undefined) {
            
            applicationDataLoader({
                appId: applications.weatherApp.appId
            })
                .then((res)=>{
                    if (typeof(res) === 'string') {
                        setWeatherData({...JSON.parse(res)})
                    } else if (typeof(res) === 'object') {
                        setWeatherData({...res})
                    } else {
                        throw new Error(`Invalid content type returned for weather`)
                    }
                })
                .catch((err)=>{
                    setWeatherData(err instanceof Error ? err : new Error('Failed to load weather data'))
                })
        }
    }, []);

    React.useEffect(()=>{
        if (!!navRef.current.trigger) {
            setPanelLocation([
                navRef.current.trigger.offsetHeight,
                window.innerWidth - navRef.current.trigger.offsetLeft - navRef.current.trigger.offsetWidth
            ])
        }
    }, [navContextState.id])
    
    return (
        <React.Fragment>
            <Button.IconButton 
                className={`${utilBtnClassName} ${utilBtnClassName}--weather ${navContextState.id.includes(navigation.utilityMenuItems.weather.menuId) ? 'active' : ''}`}
                size='INHERIT'
                fRef={ setNavTriggerRef(navigation.utilityMenuItems.weather.menuId) as any }
                // fRef={ weatherIconRef }
                icon={ svg.cloudSun as unknown as string }
                onSingleClick={ ()=> {
                    navContextUpdate({
                        type: 'SELECT',
                        payload: {
                            id: navigation.utilityMenuItems.weather.menuId,
                            nodes: navRef
                        }
                    })
                }}
            />
            { (navContextState.id[0] === navigation.utilityMenuItems.weather.menuId && panelLocation[0] !== 0 && panelLocation[1] !== 0) &&
                <div 
                    className={`${utilPaneClassName} ${utilPaneClassName}--weather`}
                    ref={ setNavMenuRef as any }
                    style={{
                        top: panelLocation[0],
                        right: panelLocation[1]
                    }}>
                        <WeatherPaneContent />
                </div>
            }
        </React.Fragment>
    )
}

const UtilityClock = (props: UtilityClockProps)=> {
    const [ userConfig, setUserConfig ] = React.useState({
        timezone: 'EST',
        hour12: true
    });
    const [ currentTime, setCurrentTime ] = React.useState<string | undefined>(Time.timeByDate(userConfig));

    React.useEffect(()=>{
        setInterval(
            ()=> setCurrentTime(Time.timeByDate(userConfig)), 
            60000 - ( parseInt(Time.timeSecondCount(userConfig)) * 100 )
        );
    }, [])

    return (
        <Button.Basic 
            className={`${utilBtnClassName} ${utilBtnClassName}--time`}
            disabled={ false }
            size='SMALL' 
            type='NAKED' 
            title={ currentTime } 
            onSingleClick={ props.toggleConfigPane } 
        />
    )
}

export const UtilityMenu = (utilProps: { className: string }) => {
    const [ configPane, setConfigPane ] = React.useState<boolean>(false);
    
    return (
        <div className={ utilProps.className }>
            <WeatherPane />
            <UtilityClock toggleConfigPane={ ()=> setConfigPane(!configPane) } />
            {/* { configPane &&
                <div className={`${utilPaneProps.className}-config`}>
                    hi
                </div>
            } */}
        </div>
    )
}
