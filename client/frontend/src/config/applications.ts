import { ApplicationDefinition } from '../types';
import { default as blog } from "../content/blog.json";
import { WeatherApp } from '../features';
// import { default as aboutme } from '../content/aboutme.md';

export const aboutMe: ApplicationDefinition = {
    appId: 'about-me',
    displayName: 'About me',
    // sourceUrl: 'http://localhost:3001/component.html',
    sourceUrl: 'http://localhost:3000/content/aboutme.md',
    sourceType: 'MD',
    dimensions: ['33%', '75%']
    // sourceContent: blog
};

export const weatherApp: ApplicationDefinition = {
    appId: 'weather',
    displayName: 'Weather',
    sourceType: 'JSON',
    sourceUrl: 'https://api.open-meteo.com/v1/forecast',
    sourceConfig: {
        params: {
            // https://open-meteo.com/en
            latitude: 39.9509,
            longitude: -75.1575,
            current_weather: true,
            temperature_unit: 'fahrenheit'
            // hourly: 'temperature_2m'
        }
    },
    renderContent: WeatherApp.bind(this, {hello:'world'}),
    dimensions: ['33%', '33%']
}

export const blogArea: ApplicationDefinition = {
    appId: 'news-blog',
    displayName: 'Recents "News"',
    sourceUrl: '',
    sourceType: 'MD'
};

export const appItems: ApplicationDefinition[] = [
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
