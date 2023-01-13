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
exports.IconButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var __1 = require("..");
require("../../utils/styles/_sizes.scss");
var IconButton = function (props) {
    var onSingleClick = props.onSingleClick;
    var keyString = Math.floor(Math.random() * 25).toString();
    return ((0, jsx_runtime_1.jsx)("button", __assign({ ref: props.fRef, className: "button button__icon button__icon--".concat(props.size === 'INHERIT' ? 'std' : props.size.toLowerCase(), " ").concat(props.className || ''), onClick: function (event) {
            if (event.button !== 0)
                return;
            if (onSingleClick !== undefined) {
                onSingleClick(event);
            }
        } }, { children: (0, jsx_runtime_1.jsx)(__1.Action.Icon, { icon: props.icon }) }), "IconButton_".concat(keyString)));
};
exports.IconButton = IconButton;
//# sourceMappingURL=IconButton.js.map