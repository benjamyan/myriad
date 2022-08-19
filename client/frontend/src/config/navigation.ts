import { SingleMenuItem } from '../types';
import { taskbar } from './_navigation/taskbar';

export const navigation: NavigationOptions = {
    taskbar: Object.values(taskbar).flat(2)    
}

export type NavigationOptions = {
    taskbar: SingleMenuItem[]
}
export {
    taskbar
}
