import * as React from 'react';
import { IconType } from 'react-icons/lib';

import { Action } from '..';
import { ClickEventHandlerProps, useClickEventHandler } from '../../hooks/useClickEventHandler';


import '../../utils/styles/_sizes.scss';

export const IconButton = (props: IconButtonProps)=> {
    const { onSingleClick, onDoubleClick } = props;
    const keyString = Math.floor(Math.random() * 25).toString();

    const clickEventHandler = useClickEventHandler({
        onSingleClick, onDoubleClick
    })
    
    return (
        <button 
            key={`IconButton_${keyString}`}
            ref={props.fRef}
            className={`button button__icon button__icon--${props.size === 'INHERIT' ? 'std' : props.size.toLowerCase()} ${props.className || ''}`}
            onClick={ (e)=> clickEventHandler(e) }
            onDoubleClick={ (e)=> clickEventHandler(e) }
            onTouchEnd={ (e)=> clickEventHandler(e) }
            // onClick={(event)=>{
            //     if (event.button !== 0) return;
            //     eventTimerRef.current = event.timeStamp;
            //     if (onSingleClick !== undefined) {
            //         onSingleClick(event)
            //     }
            // }}
            // onDoubleClick={(event)=>{
            //     if (event.button !== 0) return;
            //     if (onDoubleClick !== undefined) {
            //         onDoubleClick(event)
            //     }
            // }}
        >
            <Action.Icon icon={ props.icon } />
            { props.textContent &&
                React.createElement(props.textTag || 'p', null, props.textContent)
            }
            {/* { typeof(props.icon) === 'string' 
                ? <img className='button__icon--local' src={`assets/images/${props.icon}`} /> 
                : <props.icon /> 
            } */}
        </button>
    )
}

export interface IconButtonEvents {
    /** event to happen on single-click */
    // onSingleClick?: (event: React.MouseEvent)=> void;
    /** event to happen on double-click */
    // onDoubleClick?: (event: React.MouseEvent)=> void;
    /** Hover event */
    onHover?: (event: any)=> void;
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

    textTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p'
}
