import * as React from 'react';
import { IconType } from 'react-icons/lib';
import '../../utils/styles/_sizes.scss';
export declare const IconButton: (props: IconButtonProps) => JSX.Element;
export interface IconButtonEvents {
    /** event to happen on single-click */
    onSingleClick?: (event: React.MouseEvent) => void;
    /** event to happen on double-click */
    onDoubleClick?: (event: React.MouseEvent) => void;
    /** Hover event */
    onHover?: (event: any) => void;
}
export interface IconButtonProps extends IconButtonEvents {
    className?: string;
    size: 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | 'INHERIT';
    /** Image to be used
     * @if `icon` is a string, you need to pass in the filename/path
     * @if `icon` is of type `IconType`
     */
    icon: IconType | string;
    disabled?: boolean;
    fRef?: React.ForwardedRef<HTMLButtonElement>;
}
