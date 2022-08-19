import * as React from 'react';

export const WindowMenuBar = (menuBarProps: MenuBarProps) => {
    

    return (
        <nav className={ menuBarProps.className }>
            <i></i>
            <p>{ menuBarProps.displayName }</p>
            <div>
                <i></i>
                <i></i>
            </div>
        </nav>
    )
}

export type MenuBarProps = {
    className: string;
    displayName: string;
}
