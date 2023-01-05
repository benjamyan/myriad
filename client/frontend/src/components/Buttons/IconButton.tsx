import * as React from 'react';
import { IconType } from 'react-icons/lib';

export const IconButton = (props: IconButtonProps)=> {
    const { onSingleClick } = props;
    const keyString = Math.floor(Math.random() * 25).toString();

    return (
        <button 
            key={`IconButton_${keyString}`}
            ref={props.fRef}
            className={`button button__icon button__icon--${props.size === 'INHERIT' ? 'std' : props.size.toLowerCase()} ${props.className || ''}`}
            onMouseDown={(event)=>{
                if (!!onSingleClick) {
                    onSingleClick(event);
                }
            }}
            // onClick={(event)=>{
            //     console.log(11)
            //     if (onSingleClick !== undefined) {
            //         onSingleClick(event)
            //     }
            // }}
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

    fRef?: React.ForwardedRef<HTMLButtonElement>;
    // ref: React.MutableRefObject<HTMLButtonElement>;
}
