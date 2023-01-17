import * as React from 'react';
import { IconType } from 'react-icons/lib';
import { ReactSVG } from 'react-svg';
// import {SvgIcon, PngIcon} from 'myriad-icons'

export type IconWrapperProps = {
    icon: /*SvgIcon | PngIcon | */IconType | string;
    iconPosition?: string;
    className?: string;
}

export const Icon = ({ iconPosition, ...iconProps }: IconWrapperProps)=> {
    const className = React.useMemo(
        ()=>{
            let className = 'icon';
            if (iconPosition !== undefined) {
                className += ` icon__${iconPosition.toLowerCase()}`;
            } else {
                className += ' icon__left';
            }

            if (typeof(iconProps.icon) === 'string') {
                className += ' button__icon--local'
                if (iconProps.icon.endsWith('svg')) {
                    className += ' button__icon--local-svg'; 
                }
            }

            if (iconProps.className !== undefined) {
                className += ` ${iconProps.className}`;
            }

            return className;
        },
        []
    );

    if (typeof(iconProps.icon) === 'string') {
        if (iconProps.icon.endsWith('svg')) {
            // https://www.npmjs.com/package/react-svg
            return (
                <ReactSVG 
                    wrapper='span' 
                    className={ className } 
                    src={ iconProps.icon } 
                    beforeInjection={ (svg)=> {
                        svg.querySelector('style')?.remove();
                        svg.setAttribute('style','')
                    }}
                />
            )
        } else {
            return (
                <img className={ className } src={ iconProps.icon } />
            )
        }
    } else {
        const ReactIcon = iconProps.icon as IconType;
        return (
            <i className={ className }>
                { !!iconProps.icon ? <ReactIcon /> : <></> }
            </i>
        )
    }
};
