import { ApplicationDefinition, SingleMenuItem, MenuOptions } from "../../types";


// export const contextMenuItem = ()=> ({

// })
// export const taskbarMenuItem = ()=> ({

// })

export const menuItemFromApplication = (app: ApplicationDefinition, menuOptions: MenuOptions): SingleMenuItem => {
    const { type } = menuOptions;
    let menuItem: Partial<SingleMenuItem> = {
        appId: app.appId,
        displayName: app.displayName
    };

    if (!!type) {
        if (type === 'TASKBAR') {

            
        }
    }

    if (!!app.icon) {
        menuItem.icon = app.icon;
    }
    

    return menuItem as SingleMenuItem
}
