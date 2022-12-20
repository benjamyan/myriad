import * as React from 'react';
import { IconType } from 'react-icons/lib';

export const IconButton = (props: IconButtonProps)=> {

    const keyString = Math.floor(Math.random() * 25).toString();

    return (
        <button 
            key={`IconButton_${keyString}`}
            className={`button button__icon button__icon--${props.size === 'INHERIT' ? 'std' : props.size.toLowerCase()} ${props.className || ''}`}
            onClick={(e)=>{
                if (props.onSingleClick !== undefined) {
                    props.onSingleClick(e)
                }
            }}
        >
            { typeof(props.icon) === 'string' 
                ? <img src={props.icon} /> 
                : <props.icon /> 
            }
        </button>
    )
}

export interface IconButtonEvents {
    /** event to happen on single-click */
    onSingleClick?: (event: React.MouseEvent)=> void;
    /** event to happen on double-click */
    onDoubleClick?: (event: React.MouseEvent)=> void;
    /** Hover event */
    onHover?: (event: any)=> void;
}
export interface IconButtonProps extends IconButtonEvents {
    
    className?: string;

    size: 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | 'INHERIT';
    /**  */
    icon: IconType | string;

    disabled?: boolean;
}
