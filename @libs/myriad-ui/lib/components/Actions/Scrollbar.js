"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scrollbar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
require("./_Scrollbar.scss");
var Scrollbar = function (scrollbarProps) {
    var direction = scrollbarProps.direction;
    return ((0, jsx_runtime_1.jsx)("aside", { className: "scrollbar scrollbar__".concat(direction.toLowerCase(), " ").concat(scrollbarProps.givenClass) }));
};
exports.Scrollbar = Scrollbar;
//# sourceMappingURL=Scrollbar.js.map