import React from "react";

export interface ClickEventHandlerProps {
    /** event to happen on single-click */
    onSingleClick?: (event: React.MouseEvent | React.TouchEvent)=> void;
    /** event to happen on double-click */
    onDoubleClick?: (event: React.MouseEvent | React.TouchEvent)=> void;
} 

export const useClickEventHandler = (props: ClickEventHandlerProps)=> {
    const { onSingleClick, onDoubleClick } = props;

    const eventTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    return React.useCallback(
        (event: React.MouseEvent | React.TouchEvent)=> {
            if (onSingleClick === undefined && onDoubleClick === undefined) return; 

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
            } else if (event.detail === 1 && !!onSingleClick) {
                if (onDoubleClick === undefined) {
                    onSingleClick(event);
                } else {
                    eventTimeoutRef.current = setTimeout(function(){
                        if (!!onSingleClick) {
                            onSingleClick(event);
                        }
                    }, 200)
                }
            }
        },
        []
    );
}
