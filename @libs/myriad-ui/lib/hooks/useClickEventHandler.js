"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClickEventHandler = void 0;
var react_1 = __importDefault(require("react"));
var useClickEventHandler = function (props) {
    var onSingleClick = props.onSingleClick, onDoubleClick = props.onDoubleClick;
    var eventTimeoutRef = react_1.default.useRef(null);
    return react_1.default.useCallback(function (event) {
        if (onSingleClick === undefined && onDoubleClick === undefined)
            return;
        // if (onSingleClick !== undefined && onDoubleClick === undefined) {
        // } else if (onDoubleClick === undefined) {
        // }
        if (event.type === 'dblclick') {
            if (eventTimeoutRef.current !== null) {
                clearTimeout(eventTimeoutRef.current);
            }
            if (!!onDoubleClick) {
                onDoubleClick(event);
            }
        }
        else if (event.detail === 1 && !!onSingleClick) {
            if (onDoubleClick === undefined) {
                onSingleClick(event);
            }
            else {
                eventTimeoutRef.current = setTimeout(function () {
                    if (!!onSingleClick) {
                        onSingleClick(event);
                    }
                }, 200);
            }
        }
    }, []);
};
exports.useClickEventHandler = useClickEventHandler;
//# sourceMappingURL=useClickEventHandler.js.map