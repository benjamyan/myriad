import { ApplicationDefinition } from '../types';
import { WeatherApp } from '../features';
import { AiFillFolder } from 'react-icons/ai';
// import { default as aboutme } from '../content/aboutme.md';

export const userSettings: ApplicationDefinition = {
    appId: 'user-settings',
    displayName: 'User settings',
    sourceContent: '',
    sourceType: 'JSON'
};
export const aboutMe: ApplicationDefinition = {
    appId: 'about-me',
    displayName: 'About me',
    // sourceUrl: 'http://localhost:3001/component.html',
    sourceUrl: 'http://localhost:3000/content/aboutme.md',
    sourceType: 'MD',
    dimensions: ['33%', '75%']
    // sourceContent: blog
};
export const fileExplorer: ApplicationDefinition = {
    appId: 'file-explorer',
    displayName: 'File explorer',
    dimensions: ['33%', '50%'],
    sourceType: 'JSON',
    sourceContent: JSON.stringify([
        
    ]),
    icon: AiFillFolder
};

export const weatherApp: ApplicationDefinition = {
    appId: 'weather',
    displayName: 'Weather',
    sourceType: 'JSON',
    sourceContent: JSON.stringify({
        "latitude": 39.96187,
        "longitude": -75.155365,
        "generationtime_ms": 0.2759695053100586,
        "utc_offset_seconds": 0,
        "timezone": "GMT",
        "timezone_abbreviation": "GMT",
        "elevation": 20.0,
        "current_weather": {
            "temperature": 58.0,
            "windspeed": 11.5,
            "winddirection": 194.0,
            "weathercode": 0,
            "time": "2022-12-30T20:00"
        }
    }),
    // sourceUrl: 'https://api.open-meteo.com/v1/forecast',
    // sourceConfig: {
    //     params: {
    //         // https://open-meteo.com/en
    //         latitude: 39.9509,
    //         longitude: -75.1575,
    //         current_weather: true,
    //         temperature_unit: 'fahrenheit'
    //         // hourly: 'temperature_2m'
    //     }
    // },
    renderContent: WeatherApp,
    dimensions: ['33%', '33%']
}

export const blogArea: ApplicationDefinition = {
    appId: 'news-blog',
    displayName: 'Recents "News"',
    sourceUrl: '',
    sourceType: 'MD'
};

export const appItems: ApplicationDefinition[] = [
    userSettings,
    aboutMe,
    blogArea,
    weatherApp
];

type AppsById = {
    [key: string]: ApplicationDefinition
};
const appItemsById = function() {
    const appsById: AppsById = {};
    
    for (const app of appItems) {
        appsById[app.appId] = app
    }

    return appsById
}()
export {
    appItemsById
}


// export const fileExplorer: ApplicationDefinition = {
//     icon: '/img/explorer.png',
//     title: 'Files',
//     name: 'file-explorer'
// }

// export const skills: ApplicationDefinition = {
//     icon: '/img/explorer.png',
//     title: 'Files',
//     name: 'files'
// }
// export const experience: ApplicationDefinition = {
//     icon: '/img/explorer.png',
//     title: 'Experience',
//     name: 'experience',
//     id: 0
// }
// export const blog: ApplicationDefinition = {
//     icon: '/img/explorer.png',
//     title: 'Blog',
//     name: 'blog',
//     id: 0
// }
// export const taskbarMenuItems = [
    
// ]
