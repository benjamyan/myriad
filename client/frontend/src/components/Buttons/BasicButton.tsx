import * as React from 'react';
import { IconType } from 'react-icons/lib';
// import { ReactSVG } from 'react-svg';
import { Action } from '..';
import './_buttons.scss';

// const Icon = ({ iconPosition, ...iconProps }: Pick<BasicButtonProps, 'icon' | 'iconPosition'>)=> {

//     if (typeof(iconProps.icon) === 'string') {
//         if (iconProps.icon.endsWith('svg')) {
//             // https://www.npmjs.com/package/react-svg
//             return (
//                 <ReactSVG 
//                     wrapper='span' 
//                     className={`icon icon__${iconPosition ? iconPosition.toLowerCase() : 'left'}`} 
//                     src={`assets/images/${iconProps.icon}`} 
//                 />
//             )
//         } else {
//             return (
//                 <img className={`icon icon__${iconPosition ? iconPosition.toLowerCase() : 'left'}`} src={`assets/images/${iconProps.icon}`} />
//             )
//         }
//     } else {
//         return (
//             <i className={`icon icon__${iconPosition ? iconPosition.toLowerCase() : 'left'}`}>
//                 { !!iconProps.icon ? <iconProps.icon /> : <></> }
//             </i>
//         )
//     }
// };

export const Basic = (btnProps: BasicButtonProps) => {
    const { type, size, onHover, onSingleClick } = btnProps;
    
    const keyString = Math.floor(Math.random() * 25).toString();

    /** Classname appending based on our props */
    let _btnClassName = `button button__${type?.toLowerCase() || 'standard'} ${btnProps.className || ''}`;
    if (size) {
        _btnClassName += ` button__size--${size.toLowerCase()}`
    };
    if (onHover) {
        _btnClassName += ` button__hover--${onHover.toLowerCase()}`
    };

    return (
        <button 
            ref={ !!btnProps.btnRef ? btnProps.btnRef : undefined }
            key={`BasicButton_outer_${keyString}`}
            type={ 'button' }
            className={ _btnClassName }
            name={ btnProps.htmlName || undefined }
            disabled={ btnProps.disabled || false }
            onClick={ (event)=> {
                if (event.button !== 0) return;
                if (!!onSingleClick) {
                    onSingleClick(event);
                }
            }}
            style={{ ...btnProps.customStyle }}>
                { btnProps.title || '' }
                { !!btnProps.icon && 
                    <Action.Icon 
                        key={`BasicButton_icon-${keyString}`}
                        icon={ btnProps.icon } 
                        iconPosition={ btnProps.iconPosition } 
                    />
                }
        </button>
    )
}

interface BasicButtonClickEvents {
    /** event to happen on single-click */
    onSingleClick?: (event: React.MouseEvent)=> void;
    /** event to happen on double-click */
    onDoubleClick?: (event: any)=> void;
}
export interface BasicButtonProps extends BasicButtonClickEvents {
    /** optional classname to add */
    className?: string;
    /** Custom name for identitifcation */
    htmlName?: string;

    // dataId?: string;
    /** Given size the icon should take */
    size?: 'AUTO' | 'MINI' | 'SMALL' | 'MEDIUM' | 'LARGE';
    /** Optional flag to disable a */
    disabled?: boolean;
    /** BG color as HEX*/
    bgColor?: string;
    /** FG color as HEX*/
    fgColor?: string;
    /** given alt tag - if a title is given but alt is not, will default to the title */
    type?: 'ICON' | 'NAKED'
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

    btnRef?: any// React.MutableRefObject<Element>
}
