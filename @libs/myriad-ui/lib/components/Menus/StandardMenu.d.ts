/// <reference types="react" />
import { SingleMenuItem } from '../../types';
import './_Menu.scss';
export declare const Standard: ({ menuItem, onClick, ...menuProps }: MenuDropdownProps) => JSX.Element;
declare type MenuDropdownProps = {
    /** Required menu item to pull data from */
    menuItem: SingleMenuItem;
    /** Optional classname */
    className?: string;
    /** The optional menu type */
    type?: string;
    /** Menu item alignment */
    alignment?: 'HORIZONTAL' | 'VERTICAL';
    menuRef?: any;
    /** Optional X axis position (from `left`) */
    positionY?: number;
    /** Optional Y axis position (from `top`) */
    positionX?: number;
    onClick?: (arg0: SingleMenuItem) => any;
};
export {};
