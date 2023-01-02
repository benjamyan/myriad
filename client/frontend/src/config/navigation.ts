import { FaCaretRight, FaPowerOff, FaCompress } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs';

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
        icon: BsFillGearFill,
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
        displayName: 'System',
        icon: FaCompress,
        iconPosition: 'RIGHT'
    },
    shutdown: {
        menuId: 'shutdown',
        displayName: 'Power off',
        icon: FaPowerOff,
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
    help: {
        menuId: 'help',
        displayName: 'Help'
    }
}

export const utilityMenuItems: Record<string, SingleMenuItem> = {
    weather: {
        menuId: 'weather',
        appId: applications.weatherApp.appId,
        displayName: 'Weather'
    },
    clock: {
        menuId: 'clock',
        displayName: 'Clock',
        appId: applications.userSettings.appId
    }
}

export const systemTrayItems: Record<string, SingleMenuItem> = {
    fileExplorer: {
        menuId: 'explorer',
        displayName: 'File explorer',
        icon: applications.fileExplorer.icon,
        appId: applications.fileExplorer.appId
    }
} 

export const allNavigationItems: Record<string, SingleMenuItem> = {
    ...utilityMenuItems,
    ...taskMenuItems,
    ...finderMenu
}

