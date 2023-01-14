
export type ThemeOptions = 'DARK' | 'LIGHT';

export type ClientLocation = {
    latitude: number;
    longitude: number;
    timezone: string;
}

export type ClientSettingsContextState = {
    location: ClientLocation;
    theme: ThemeOptions;
}
