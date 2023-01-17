import { UserConfigProps } from '../../../types'

export const timeByDate = (userConfig: UserConfigProps): string => (
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', ...userConfig })
);

export const timeSecondCount = (userConfig: UserConfigProps): string => (
    new Date().toLocaleTimeString('en-GB', { timeZone: userConfig.timezone, second: '2-digit' })
);
