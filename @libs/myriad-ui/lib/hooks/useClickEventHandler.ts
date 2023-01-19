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
    const eventCounterRef = React.useRef<number>(0);

    return React.useCallback(
        (event: React.MouseEvent | React.TouchEvent)=> {
            if (onSingleClick === undefined && onDoubleClick === undefined) return; 
            
            if (event.type === 'dblclick' || eventCounterRef.current >= 2) {
                if (eventTimeoutRef.current !== null) {
                    clearTimeout(eventTimeoutRef.current);
                }
                if (!!onDoubleClick) {
                    onDoubleClick(event);
                }
                eventCounterRef.current = 0;
            } else /*if (event.detail === 1 && !!onSingleClick)*/ {
                if (!!onSingleClick) {
                    if (onDoubleClick === undefined) {
                        onSingleClick(event);
                        eventCounterRef.current = 0;
                    } else {
                        eventTimeoutRef.current = setTimeout(function(){
                            // if (eventCounterRef.current >= 2 && !!onDoubleClick) {
                            //     onDoubleClick(event);
                            // } else 
                            if (!!onSingleClick) {
                                onSingleClick(event);
                            }
                            eventCounterRef.current = 0;
                        }, 200)
                    }
                }
            }
            eventCounterRef.current += 1;
        },
        []
    );
}
