import { FaCaretRight, FaPowerOff, FaCompress } from 'react-icons/fa';

import { aboutMe, blogArea } from '../applications';
import { SingleMenuItem } from '../../types';

const finderMenu: SingleMenuItem[] = [
    {
        appId: aboutMe.appId,
        menuId: aboutMe.appId,
        displayName: aboutMe.displayName
    },
    {
        appId: blogArea.appId,
        menuId: blogArea.appId,
        displayName: blogArea.displayName
    },
    {
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
    {
        menuId: 'system',
        displayName: 'System',
        icon: FaCompress,
        iconPosition: 'RIGHT'
    },
    {
        menuId: 'shutdown',
        displayName: 'Power off',
        icon: FaPowerOff,
        iconPosition: 'RIGHT'
    },
];

const taskMenuItems: SingleMenuItem[] = [
    {
        menuId: 'taskbar-finder',
        displayName: 'Finder',
        subMenu: finderMenu,
        subMenuPosition: 'BOTTOM'
    },
    {
        menuId: 'taskbar-help',
        displayName: 'Help'
    }
];

export const taskbar = {
    finder: finderMenu,
    taskMenu: taskMenuItems
}
