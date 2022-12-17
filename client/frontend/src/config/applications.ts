import { ApplicationDefinition } from '../types';
import { default as blog } from "../content/blog.json";

export const aboutMe: ApplicationDefinition = {
    appId: 'about-me',
    displayName: 'About me',
    sourceUrl: 'http://localhost:3001/component.html',
    // sourceUrl: undefined,
    // sourceContent: blog
};

export const blogArea: ApplicationDefinition = {
    appId: 'news-blog',
    displayName: 'Recents "News"',
    sourceUrl: ''
};

export const appItems: ApplicationDefinition[] = [
    aboutMe,
    blogArea
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
