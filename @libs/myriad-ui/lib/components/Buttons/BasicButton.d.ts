/// <reference types="react" />
import { IconType } from 'react-icons/lib';
import { ClickEventHandlerProps } from '../../hooks/useClickEventHandler';
import './_buttons.scss';
export declare const Basic: (btnProps: BasicButtonProps) => JSX.Element;
export interface BasicButtonProps extends ClickEventHandlerProps {
    /** optional classname to add */
    className?: string;
    /** Custom name for identitifcation */
    htmlName?: string;
    /** Given size the icon should take */
    size?: 'AUTO' | 'MINI' | 'SMALL' | 'MEDIUM' | 'LARGE';
    /** Optional flag to disable a */
    disabled?: boolean;
    /** BG color as HEX*/
    bgColor?: string;
    /** FG color as HEX*/
    fgColor?: string;
    /** given alt tag - if a title is given but alt is not, will default to the title */
    type?: 'ICON' | 'NAKED';
    /** Title to be displayed */
    title?: string;
    /** URI of the icon */
    icon?: IconType | string;
    /** positioon of the icon relative to the title */
    iconPosition?: 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';
    /** custom styles can be added to the base element */
    customStyle?: any;
    /** Prebuilt on-hover effects */
    onHover?: 'HIGHLIGHT' | 'UNDERLINE';
    btnRef?: any;
}
