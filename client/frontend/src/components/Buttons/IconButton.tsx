import * as React from 'react';
import { IconType } from 'react-icons/lib';
import { Action } from '..';

import '../../utils/styles/_sizes.scss';

export const IconButton = (props: IconButtonProps)=> {
    const { onSingleClick } = props;
    const keyString = Math.floor(Math.random() * 25).toString();
    
    return (
        <button 
            key={`IconButton_${keyString}`}
            ref={props.fRef}
            className={`button button__icon button__icon--${props.size === 'INHERIT' ? 'std' : props.size.toLowerCase()} ${props.className || ''}`}
            onClick={(event)=>{
                if (event.button !== 0) return;
                if (onSingleClick !== undefined) {
                    onSingleClick(event)
                }
            }}
        >
            <Action.Icon icon={ props.icon } />
            {/* { typeof(props.icon) === 'string' 
                ? <img className='button__icon--local' src={`assets/images/${props.icon}`} /> 
                : <props.icon /> 
            } */}
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
    /** Image to be used
     * @if `icon` is a string, you need to pass in the filename/path
     * @if `icon` is of type `IconType` 
     */
    icon: IconType | string;

    disabled?: boolean;

    fRef?: React.ForwardedRef<HTMLButtonElement>;
    // ref: React.MutableRefObject<HTMLButtonElement>;
}
