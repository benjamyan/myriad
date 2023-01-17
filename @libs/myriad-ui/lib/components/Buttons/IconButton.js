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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var __1 = require("..");
var useClickEventHandler_1 = require("../../hooks/useClickEventHandler");
require("../../utils/styles/_sizes.scss");
var IconButton = function (props) {
    var onSingleClick = props.onSingleClick, onDoubleClick = props.onDoubleClick;
    var keyString = Math.floor(Math.random() * 25).toString();
    var clickEventHandler = (0, useClickEventHandler_1.useClickEventHandler)({
        onSingleClick: onSingleClick,
        onDoubleClick: onDoubleClick
    });
    return ((0, jsx_runtime_1.jsxs)("button", __assign({ ref: props.fRef, className: "button button__icon button__icon--".concat(props.size === 'INHERIT' ? 'std' : props.size.toLowerCase(), " ").concat(props.className || ''), onClick: function (e) { return clickEventHandler(e); }, onDoubleClick: function (e) { return clickEventHandler(e); }, onTouchEnd: function (e) { return clickEventHandler(e); } }, { children: [(0, jsx_runtime_1.jsx)(__1.Action.Icon, { icon: props.icon }), props.textContent &&
                React.createElement(props.textTag || 'p', null, props.textContent)] }), "IconButton_".concat(keyString)));
};
exports.IconButton = IconButton;
//# sourceMappingURL=IconButton.js.map