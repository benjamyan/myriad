"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemFromApplication = void 0;
// export const contextMenuItem = ()=> ({
// })
// export const taskbarMenuItem = ()=> ({
// })
var menuItemFromApplication = function (app, menuOptions) {
    var type = menuOptions.type;
    var menuItem = {
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
    return menuItem;
};
exports.menuItemFromApplication = menuItemFromApplication;
//# sourceMappingURL=menuItems.js.map