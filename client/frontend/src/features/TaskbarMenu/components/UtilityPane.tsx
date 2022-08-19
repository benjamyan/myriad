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

export const UtilityPane = (utilPaneProps: any) => {
    const [ userConfig, setUserConfig ] = React.useState({
        timezone: 'EST',
        hour12: true
    });
    const [ currentTime, setCurrentTime ] = React.useState<string | null>(timeByDate(userConfig));
    const [ configPane, setConfigPane ] = React.useState<boolean>(false);

    React.useEffect(()=>{
        setInterval(
            ()=> setCurrentTime(timeByDate(userConfig)), 
            60000 - ( parseInt(timeSecondCount(userConfig)) * 100 )
        );
    }, [])
        
    return (
        <div className={ utilPaneProps.className }>
            <Button.Basic 
                size='SMALL' 
                type='NAKED' 
                disabled={ false }
                title={ currentTime } 
                onSingleClick={ ()=> setConfigPane(!configPane) } 
            />
            { configPane &&
                <div className={`${utilPaneProps.className}-config`}>
                    hi
                </div>
            }
        </div>
    )
}
