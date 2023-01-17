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
    var eventCounterRef = react_1.default.useRef(0);
    return react_1.default.useCallback(function (event) {
        if (onSingleClick === undefined && onDoubleClick === undefined)
            return;
        if (event.type === 'dblclick' || eventCounterRef.current >= 2) {
            if (eventTimeoutRef.current !== null) {
                clearTimeout(eventTimeoutRef.current);
            }
            if (!!onDoubleClick) {
                onDoubleClick(event);
            }
        }
        else /*if (event.detail === 1 && !!onSingleClick)*/ {
            if (!!onSingleClick) {
                if (onDoubleClick === undefined) {
                    onSingleClick(event);
                }
                else {
                    eventTimeoutRef.current = setTimeout(function () {
                        // if (eventCounterRef.current >= 2 && !!onDoubleClick) {
                        //     onDoubleClick(event);
                        // } else 
                        if (!!onSingleClick) {
                            onSingleClick(event);
                        }
                        eventCounterRef.current = 0;
                    }, 200);
                }
            }
        }
        eventCounterRef.current += 1;
    }, []);
};
exports.useClickEventHandler = useClickEventHandler;
//# sourceMappingURL=useClickEventHandler.js.map