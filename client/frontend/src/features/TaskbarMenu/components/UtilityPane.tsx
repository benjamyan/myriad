import React from 'react';
import { Button } from '../../../components';

type UserConfigProps = {
    timezone: string;
}
const timeByDate = (userConfig: UserConfigProps): string => (
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', ...userConfig })
);
const timeSecondCount = (userConfig: UserConfigProps): string => (
    new Date().toLocaleTimeString('en-GB', { timeZone: userConfig.timezone, second: '2-digit' })
);

type UtilityClockProps = {
    toggleConfigPane: ()=> void;
}

const UtilityClock = (props: UtilityClockProps)=> {
    const [ userConfig, setUserConfig ] = React.useState({
        timezone: 'EST',
        hour12: true
    });
    const [ currentTime, setCurrentTime ] = React.useState<string | undefined>(timeByDate(userConfig));

    React.useEffect(()=>{
        setInterval(
            ()=> setCurrentTime(timeByDate(userConfig)), 
            60000 - ( parseInt(timeSecondCount(userConfig)) * 100 )
        );
    }, [])

    return (
        <Button.Basic 
            size='SMALL' 
            type='NAKED' 
            className='time'
            disabled={ false }
            title={ currentTime } 
            onSingleClick={ props.toggleConfigPane } 
        />
    )
}

export const UtilityPane = (utilPaneProps: any) => {
    const [ configPane, setConfigPane ] = React.useState<boolean>(false);
    
    return (
        <div className={ utilPaneProps.className }>
            <UtilityClock toggleConfigPane={ ()=> setConfigPane(!configPane) } />
            { configPane &&
                <div className={`${utilPaneProps.className}-config`}>
                    hi
                </div>
            }
        </div>
    )
}
