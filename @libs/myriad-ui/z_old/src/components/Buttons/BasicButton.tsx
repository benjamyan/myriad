import * as React from 'react';
import { IconType } from 'react-icons/lib';
import './_buttons.scss';

// const iconOnClickHanlder = ({ onSingleClick, onDoubleClick }: BasicButtonClickEvents)=> {
//     if (!!onSingleClick) {
//         onSingleClick(event);
//     }
// }

const Icon = ({ iconPosition, ...iconProps }: Pick<BasicButtonProps, 'icon' | 'iconPosition'>)=> (
    <i className={`icon icon__${iconPosition ? iconPosition.toLowerCase() : 'left'}`}>
        { !!iconProps.icon ? <iconProps.icon /> : <></> }
    </i>
);

export const Basic = (btnProps: BasicButtonProps) => {
    const { type, size, onHover, onSingleClick } = btnProps;
    let _btnClassName = `button button__${type.toLowerCase() || 'standard'} ${btnProps.className || ''}`;

    if (size) _btnClassName += ` button__size--${size.toLowerCase()}`;
    if (onHover) _btnClassName += ` button__hover--${onHover.toLowerCase()}`;

    return (
        <button 
            data-id={ btnProps.dataId }
            ref={ !!btnProps.btnRef ? btnProps.btnRef : undefined }
            key={`BasicButton_${(Math.floor(Math.random() * 25)).toString()}`}
            type={ 'button' }
            className={ _btnClassName }
            name={ btnProps.htmlName || undefined }
            disabled={ btnProps.disabled || false }
            onClick={ 
                (event)=> {
                    event.preventDefault();
                    if (!!onSingleClick) {
                        onSingleClick(event);
                    }
                } 
            }
            style={{ ...btnProps.customStyle }}>
                { btnProps.title || '' }
                { !!btnProps.icon && 
                    <Icon icon={ btnProps.icon } iconPosition={ btnProps.iconPosition } />
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

    dataId?: string;
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
    icon?: IconType;
    /** positioon of the icon relative to the title */
    iconPosition?: 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';
    /** custom styles can be added to the base element */
    customStyle?: any;
    /** Prebuilt on-hover effects */
    onHover?: 'HIGHLIGHT' | 'UNDERLINE';

    btnRef?: any// React.MutableRefObject<Element>
}
