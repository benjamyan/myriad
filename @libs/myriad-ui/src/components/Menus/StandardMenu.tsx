import * as React from 'react';
import { SingleMenuItem } from '../../types';
import { Button } from '..';
import './_Menu.scss';

export const Standard = ({ menuItem, onClick, ...menuProps }: MenuDropdownProps)=> (
    <aside 
        key={ `std-menu-${menuItem.menuId}` }
        ref={ !!menuProps.menuRef ? menuProps.menuRef : undefined }
        className={`menu__${ menuProps.type || 'standard' } ${menuProps.className || ''}`} 
        style={{ 
            top: menuProps.positionY || undefined,
            left: menuProps.positionX || undefined  
        }}>
            { menuItem.subMenu && menuItem.subMenu.map(
                (subMenuItem, index)=> (
                    <Button.Basic
                        key={`MenuStandard_btn_${index}_${menuItem.appId}`}
                        // dataId={subMenuItem.menuId || undefined }
                        type='NAKED'
                        onHover='HIGHLIGHT'
                        disabled={ false }
                        icon={ subMenuItem.icon || undefined }
                        iconPosition={ subMenuItem.iconPosition || undefined }
                        title={ subMenuItem.displayName }
                        onSingleClick={ ()=> {
                            if (onClick) {
                                onClick(subMenuItem)
                            }
                        } }
                    />
                )
            ) }
    </aside>
);

type MenuDropdownProps = {
    /** Required menu item to pull data from */
    menuItem: SingleMenuItem;
    /** Optional classname */
    className?: string;
    /** The optional menu type */
    type?: string;
    /** Menu item alignment */
    alignment?: 'HORIZONTAL' | 'VERTICAL';

    menuRef?: any
    /** Optional X axis position (from `left`) */
    positionY?: number;
    /** Optional Y axis position (from `top`) */
    positionX?: number;

    onClick?: (arg0: SingleMenuItem)=> any;
    /** Custom button props to use */
    // customButton?: Button.BasicButtonProps;
};
