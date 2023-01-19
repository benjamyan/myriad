import { svg, png } from 'myriad-icons';
import { ApplicationDefinition } from '../../types';
import { WeatherApp, FileExplorerWrapper } from '../../features';
import { AiFillFolder } from 'react-icons/ai';
import { ImageViewer } from '../../features/ImageViewer/ImageViewer';

export const userSettings: ApplicationDefinition = {
    appId: 'user-settings',
    displayName: 'User settings',
    sourceContent: '',
    sourceType: 'JSON'
};
export const aboutMe: ApplicationDefinition = {
    appId: 'about-me',
    displayName: 'About me',
    sourceUrl: 'content/aboutme.md',
    // sourceUrl: 'http://localhost:3000/content/aboutme.md',
    sourceType: 'MD',
    // icon: 'preview-so.png',
    icon: png.previewSo,
    dimensions: ['33%', '75%']
};
export const myResume: ApplicationDefinition = {
    appId: 'my-resume',
    displayName: 'My resume',
    sourceUrl: 'content/myresume.json',
    // sourceUrl: 'http://localhost:3000/content/myresume.json',
    sourceType: 'JSON',
    dimensions: ['40%', '90%']
};
export const badassMf : ApplicationDefinition = {
    appId: 'badassmf',
    displayName: 'coolguy.jpg',
    sourceType: 'MEDIA',
    // sourceContent: 'http://localhost:3000/content/honey2.jpg',
    sourceContent: 'content/honey2.jpg',
    renderContent: ImageViewer,
    // icon: 'preview-so.png',
    icon: png.previewSo,
    dimensions: ['50%', '40%']
};
export const imageViewer: ApplicationDefinition = {
    appId: 'image-viewer',
    displayName: 'Image Viewer',
    // sourceUrl: 'http://localhost:3000/content/aboutme.md',
    sourceType: 'JSON',
    sourceContent: '',
    dimensions: ['50%', '33%']
};
export const fileExplorer: ApplicationDefinition = {
    appId: 'file-explorer',
    displayName: 'File Explorer [Read only]',
    dimensions: ['33%', '50%'],
    sourceUrl: 'content/fileExplorer.json',
    // sourceUrl: 'http://localhost:3000/content/fileExplorer.json',
    sourceType: 'JSON',
    renderContent: FileExplorerWrapper,
    icon: AiFillFolder
};
export const trashExplorer: ApplicationDefinition = {
    appId: 'trash-explorer',
    displayName: 'File Explorer [Read only]',
    dimensions: ['33%', '50%'],
    sourceUrl: 'content/trashExplorer.json',
    // sourceUrl: 'http://localhost:3000/content/trashExplorer.json',
    sourceType: 'JSON',
    renderContent: FileExplorerWrapper,
    icon: AiFillFolder
};
export const systemOverview: ApplicationDefinition = {
    appId: 'system-overview',
    displayName: 'System',
    dimensions: ['50%','33%'],
    sourceType: 'HTML',
    sourceUrl: 'content/systemInfo.html'
    // sourceUrl: 'http://localhost:3000/content/systemInfo.html'
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

// type AppsById = {
//     [key: string]: ApplicationDefinition
// };
// const appItemsById = function() {
//     const appsById: AppsById = {};
    
//     for (const app of appItems) {
//         appsById[app.appId] = app
//     }

//     return appsById
// }()
// export {
//     appItemsById
// }


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
