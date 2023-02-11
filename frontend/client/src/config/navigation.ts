import { FaCaretRight, FaPowerOff, FaCompress } from 'react-icons/fa';
import { svg, png } from 'myriad-icons';

import { SingleMenuItem } from '../types';
import { default as applications } from './applications';

const finderMenu: Record<string, SingleMenuItem> = {
    [applications.aboutMe.appId]: {
        appId: applications.aboutMe.appId,
        menuId: applications.aboutMe.appId,
        displayName: applications.aboutMe.displayName
    },
    [applications.blogArea.appId]: {
        appId: applications.blogArea.appId,
        menuId: applications.blogArea.appId,
        displayName: applications.blogArea.displayName
    },
    settings: {
        menuId: 'settings',
        appId: applications.userSettings.appId,
        displayName: 'Settings',
        // icon: BsFillGearFill,
        // icon: 'config-so.svg',
        icon: svg.configTr,
        iconPosition: 'RIGHT'
    },
    services: {
        menuId: 'menu-services',
        displayName: 'Services',
        icon: FaCaretRight,
        iconPosition: 'RIGHT',
        subMenu: [
            {
                menuId: 'menu-services-TODO',
                displayName: '',
                // icon: null
            }
        ]
    },
    system: {
        menuId: 'system',
        appId: applications.systemOverview.appId,
        displayName: 'System Information',
        icon: FaCompress,
        iconPosition: 'RIGHT'
    },
    shutdown: {
        menuId: 'shutdown',
        displayName: 'Power off',
        icon: svg.powerTr,
        iconPosition: 'RIGHT'
    }
}

export const taskMenuItems: Record<string, SingleMenuItem> = {
    finder: {
        menuId: 'finder',
        displayName: 'Finder',
        subMenu: Object.values(finderMenu),
        subMenuPosition: 'BOTTOM'
    },
    // help: {
    //     menuId: 'help',
    //     displayName: 'Help'
    // }
}

export const utilityMenuItems: Record<string, SingleMenuItem> = {
    // weather: {
    //     menuId: 'weather',
    //     appId: applications.weatherApp.appId,
    //     displayName: 'Weather',
    //     defereEventHandling: true
    // },

    github: {
        menuId: 'github-link',
        displayName: 'github',
        icon: svg.githubSo,
        onClick: ()=> window.open('https://github.com/benjamyan', '_blank')
    },
    linkedin: {
        menuId: 'linkin-link',
        displayName: 'linkin',
        icon: svg.linkedinSo,
        onClick: ()=> window.open('https://linkedin.com/in/benyannella', '_blank')
    }
    // clock: {
    //     menuId: 'clock',
    //     displayName: 'Clock',
    //     appId: applications.userSettings.appId
    // }
}

export const systemTrayItems: Record<string, SingleMenuItem> = {
    fileExplorer: {
        menuId: 'explorer',
        displayName: 'File Explorer',
        icon: svg.folderOpenSo,
        // icon: 'folder-so.png',
        // icon: applications.fileExplorer.icon,
        appId: applications.fileExplorer.appId
    },
    trash: {
        menuId: 'trash',
        displayName: 'Trash',
        // icon: 'trash-so.png',
        icon: svg.trashSo,
        appId: applications.trashExplorer.appId
        // icon: applications.fileExplorer.icon,
        // appId: applications.fileExplorer.appId
    }
}

export const desktopItems: Record<string, SingleMenuItem> = {
    fileExplorer: {
        menuId: 'explorer',
        displayName: 'File Explorer',
        // icon: png.previewSo,
        icon: svg.folderOpenSo,
        // icon: 'folder-so.png',
        // icon: applications.fileExplorer.icon,
        appId: applications.fileExplorer.appId
    },
    badass: {
        menuId: 'badassmf',
        displayName: applications.badassMf.displayName,
        icon: applications.badassMf.icon,
        appId: applications.badassMf.appId
    }
}

export const allNavigationItems: Record<string, SingleMenuItem> = {
    ...utilityMenuItems,
    ...taskMenuItems,
    ...finderMenu
}

