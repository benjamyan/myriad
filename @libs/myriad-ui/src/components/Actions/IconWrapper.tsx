import * as React from 'react';
import { IconType } from 'react-icons/lib';
import { ReactSVG } from 'react-svg';

export type IconWrapperProps = {
    icon: IconType | string;
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
                <img className={ className } src={`assets/images/${iconProps.icon}`} />
            )
        }
    } else {
        return (
            <i className={ className }>
                { !!iconProps.icon ? <iconProps.icon /> : <></> }
            </i>
        )
    }
};
