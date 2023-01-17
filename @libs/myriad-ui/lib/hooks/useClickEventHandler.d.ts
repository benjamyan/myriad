import React from "react";
export interface ClickEventHandlerProps {
    /** event to happen on single-click */
    onSingleClick?: (event: React.MouseEvent | React.TouchEvent) => void;
    /** event to happen on double-click */
    onDoubleClick?: (event: React.MouseEvent | React.TouchEvent) => void;
}
export declare const useClickEventHandler: (props: ClickEventHandlerProps) => (event: React.MouseEvent | React.TouchEvent) => void;
