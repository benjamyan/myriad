import * as React from 'react';
import { IconType } from 'react-icons/lib';
import { ClickEventHandlerProps } from '../../hooks/useClickEventHandler';
import '../../utils/styles/_sizes.scss';
export declare const IconButton: (props: IconButtonProps) => JSX.Element;
export interface IconButtonEvents {
    /** event to happen on single-click */
    /** event to happen on double-click */
    /** Hover event */
    onHover?: (event: any) => void;
}
export interface IconButtonProps extends ClickEventHandlerProps, IconButtonEvents {
    className?: string;
    size: 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | 'INHERIT';
    /** Image to be used
     * @if `icon` is a string, you need to pass in the filename/path
     * @if `icon` is of type `IconType`
     */
    icon: IconType | string;
    disabled?: boolean;
    fRef?: React.ForwardedRef<HTMLButtonElement>;
    textContent?: string;
    textTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
}
