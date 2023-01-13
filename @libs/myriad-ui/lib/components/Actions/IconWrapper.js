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
exports.Icon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var react_svg_1 = require("react-svg");
var Icon = function (_a) {
    var iconPosition = _a.iconPosition, iconProps = __rest(_a, ["iconPosition"]);
    var className = React.useMemo(function () {
        var className = 'icon';
        if (iconPosition !== undefined) {
            className += " icon__".concat(iconPosition.toLowerCase());
        }
        else {
            className += ' icon__left';
        }
        if (typeof (iconProps.icon) === 'string') {
            className += ' button__icon--local';
            if (iconProps.icon.endsWith('svg')) {
                className += ' button__icon--local-svg';
            }
        }
        if (iconProps.className !== undefined) {
            className += " ".concat(iconProps.className);
        }
        return className;
    }, []);
    if (typeof (iconProps.icon) === 'string') {
        if (iconProps.icon.endsWith('svg')) {
            // https://www.npmjs.com/package/react-svg
            return ((0, jsx_runtime_1.jsx)(react_svg_1.ReactSVG, { wrapper: 'span', className: className, src: "assets/images/".concat(iconProps.icon), beforeInjection: function (svg) {
                    var _a;
                    (_a = svg.querySelector('style')) === null || _a === void 0 ? void 0 : _a.remove();
                    svg.setAttribute('style', '');
                } }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)("img", { className: className, src: "assets/images/".concat(iconProps.icon) }));
        }
    }
    else {
        return ((0, jsx_runtime_1.jsx)("i", __assign({ className: className }, { children: !!iconProps.icon ? (0, jsx_runtime_1.jsx)(iconProps.icon, {}) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) })));
    }
};
exports.Icon = Icon;
//# sourceMappingURL=IconWrapper.js.map