import { IconType } from "react-icons";
import { ApplicationDefinition } from "../";

export type MenuTypeOptions = 'CONTEXT' | 'TASKBAR';

export type MenuOptions = {
    /** Type of menu - defaults to 'CONTEXT' */
    type?: MenuTypeOptions;
    /** Callback to be fired on click */
    onClickCallback: ()=> any;
}

export type SingleMenuItem = {
    /** ID for the associated applicatin (if there is one) */
    appId?: ApplicationDefinition['appId'];
    /** unique ID for the menu item  */
    menuId: string;
    /** Text to display for menu item */
    displayName: ApplicationDefinition['displayName'];
    /** Icon as string to display - refactor to `FontAwesome` */
    icon?: IconType;
    /** Appear to the right or left of content - defaults to `left` */
    iconPosition?: 'RIGHT' | 'LEFT';
    /** The menu can spawn a submenu */
    subMenu?: SingleMenuItem[] //Omit<SingleMenuItem[], 'subMenu' | 'subMenuPosition'>;
    /** Position the sub menu should take - defaults to `right` */
    subMenuPosition?: 'BOTTOM' | 'RIGHT' | 'LEFT';
    /** What should happen when menu item is clicked - Will open `subMenu` if it is present, and override this def */
    onClick?: ()=> void;
}
