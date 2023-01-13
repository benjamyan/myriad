export declare type ThemeOptions = 'DARK' | 'LIGHT';
export declare type ClientLocation = {
    latitude: number;
    longitude: number;
    timezone: string;
};
export declare type ClientSettingsContextState = {
    location: ClientLocation;
    theme: ThemeOptions;
};
