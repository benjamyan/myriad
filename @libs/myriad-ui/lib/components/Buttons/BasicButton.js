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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basic = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// import { ReactSVG } from 'react-svg';
var __1 = require("..");
require("./_buttons.scss");
// const Icon = ({ iconPosition, ...iconProps }: Pick<BasicButtonProps, 'icon' | 'iconPosition'>)=> {
//     if (typeof(iconProps.icon) === 'string') {
//         if (iconProps.icon.endsWith('svg')) {
//             // https://www.npmjs.com/package/react-svg
//             return (
//                 <ReactSVG 
//                     wrapper='span' 
//                     className={`icon icon__${iconPosition ? iconPosition.toLowerCase() : 'left'}`} 
//                     src={`assets/images/${iconProps.icon}`} 
//                 />
//             )
//         } else {
//             return (
//                 <img className={`icon icon__${iconPosition ? iconPosition.toLowerCase() : 'left'}`} src={`assets/images/${iconProps.icon}`} />
//             )
//         }
//     } else {
//         return (
//             <i className={`icon icon__${iconPosition ? iconPosition.toLowerCase() : 'left'}`}>
//                 { !!iconProps.icon ? <iconProps.icon /> : <></> }
//             </i>
//         )
//     }
// };
var Basic = function (btnProps) {
    var type = btnProps.type, size = btnProps.size, onHover = btnProps.onHover, onSingleClick = btnProps.onSingleClick;
    var keyString = Math.floor(Math.random() * 25).toString();
    /** Classname appending based on our props */
    var _btnClassName = "button button__".concat((type === null || type === void 0 ? void 0 : type.toLowerCase()) || 'standard', " ").concat(btnProps.className || '');
    if (size) {
        _btnClassName += " button__size--".concat(size.toLowerCase());
    }
    ;
    if (onHover) {
        _btnClassName += " button__hover--".concat(onHover.toLowerCase());
    }
    ;
    return ((0, jsx_runtime_1.jsxs)("button", __assign({ ref: !!btnProps.btnRef ? btnProps.btnRef : undefined, type: 'button', className: _btnClassName, name: btnProps.htmlName || undefined, disabled: btnProps.disabled || false, onClick: function (event) {
            if (event.button !== 0)
                return;
            if (!!onSingleClick) {
                onSingleClick(event);
            }
        }, style: __assign({}, btnProps.customStyle) }, { children: [btnProps.title || '', !!btnProps.icon &&
                (0, jsx_runtime_1.jsx)(__1.Action.Icon, { icon: btnProps.icon, iconPosition: btnProps.iconPosition }, "BasicButton_icon-".concat(keyString))] }), "BasicButton_outer_".concat(keyString)));
};
exports.Basic = Basic;
//# sourceMappingURL=BasicButton.js.map