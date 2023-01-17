"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandling = exports.Basic = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var __1 = require("..");
// import config from 'assets/icons/config-so.svg';
exports.default = {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Basic',
    component: __1.Button.Basic,
};
var Basic = function () {
    return ((0, jsx_runtime_1.jsx)(__1.Button.Basic, { title: 'Hello world!' }));
};
exports.Basic = Basic;
var EventHandling = function () {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(__1.Button.Basic, { title: 'Single click only', onSingleClick: function () {
                    console.log('Hello single click only!');
                } }), (0, jsx_runtime_1.jsx)(__1.Button.Basic, { title: 'Double click only', onDoubleClick: function () {
                    console.log('Hello double click only!');
                } }), (0, jsx_runtime_1.jsx)(__1.Button.Basic, { title: 'Single and double Click 1', onSingleClick: function () {
                    console.log('Hello single click 1!');
                }, onDoubleClick: function () {
                    console.log('Hello double click 1!');
                } }), (0, jsx_runtime_1.jsx)(__1.Button.IconButton
            // title='Single and double Click 1'
            , { 
                // title='Single and double Click 1'
                size: 'INHERIT', icon: 'assets/icons/config-so.svg', onSingleClick: function () {
                    console.log('Hello single click 1!');
                }, onDoubleClick: function () {
                    console.log('Hello double click 1!');
                } })] }));
};
exports.EventHandling = EventHandling;
//# sourceMappingURL=Buttons.stories.js.map