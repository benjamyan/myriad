import { SingleMenuItem } from '../../../types';

import { navigation } from '../../../config';

export const navAreaBySourceName = (source: string): SingleMenuItem[] | undefined => {
    // switch (source) {
    //     case 'taskbar': {
            return navigation[source]
    //     }
    // }
    // return []
}

export const menuItemById = (id: string, source: SingleMenuItem[] | string): SingleMenuItem | undefined=> {
    if (Array.isArray(source)) {
        return source.find( (menuItem)=> menuItem.menuId === id );
    } else {
        return navAreaBySourceName(source).find( (menuItem)=> menuItem.menuId === id );
    }
    
}
