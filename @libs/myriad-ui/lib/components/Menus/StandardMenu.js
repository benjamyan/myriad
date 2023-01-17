"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Standard = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var __1 = require("..");
require("./_Menu.scss");
var Standard = function (_a) {
    var _b;
    var menuItem = _a.menuItem, onClick = _a.onClick, menuProps = __rest(_a, ["menuItem", "onClick"]);
    return ((0, jsx_runtime_1.jsx)("aside", __assign({ ref: !!menuProps.menuRef ? menuProps.menuRef : undefined, className: "menu__".concat(menuProps.type || 'standard', " ").concat(menuProps.className || ''), style: {
            top: menuProps.positionY || undefined,
            left: menuProps.positionX || undefined
        } }, { children: (_b = menuItem.subMenu) === null || _b === void 0 ? void 0 : _b.map(function (subMenuItem, index) { return ((0, jsx_runtime_1.jsx)(__1.Button.Basic, { 
            // dataId={subMenuItem.menuId || undefined }
            type: 'NAKED', onHover: 'HIGHLIGHT', disabled: false, icon: subMenuItem.icon || undefined, iconPosition: subMenuItem.iconPosition || undefined, title: subMenuItem.displayName, onSingleClick: function () {
                if (onClick) {
                    onClick(subMenuItem);
                }
            } }, "MenuStandard_btn_".concat(index, "_").concat(menuItem.appId))); }) }), "std-menu-".concat(menuItem.menuId)));
};
exports.Standard = Standard;
//# sourceMappingURL=StandardMenu.js.map