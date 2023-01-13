/// <reference types="react" />
import { IconType } from 'react-icons/lib';
export declare type IconWrapperProps = {
    icon: IconType | string;
    iconPosition?: string;
    className?: string;
};
export declare const Icon: ({ iconPosition, ...iconProps }: IconWrapperProps) => JSX.Element;
