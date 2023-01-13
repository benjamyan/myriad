/// <reference types="react" />
import './_Scrollbar.scss';
export declare const Scrollbar: (scrollbarProps: ScrollbarProps) => JSX.Element;
export interface ScrollbarProps {
    [key: string]: any;
    /** Can take a classname */
    givenClass?: string;
    /** The directional axis it displays as */
    direction: 'VERTICAL' | 'HORIZONTAL';
}
