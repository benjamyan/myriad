import * as React from 'react';

import { taskbar } from '../../../config';
import { Button, Menu } from '../../../components';
import { useApplicationContext, useNavigationContext, NavStateNodeType, NavActionNodeRecord } from '../../../providers';
import { SingleMenuItem } from '../../../types';

let _taskbarMenuClassName: string;

export const TaskbarActionMenu = ({ className }: TaskbarActionMenuProps)=> {
    _taskbarMenuClassName = className;
    const { navContextState, navContextUpdate } = useNavigationContext();
    const { appContextDispatch } = useApplicationContext();
    
    const menuRef = React.useRef<NavActionNodeRecord>({
        trigger: undefined,
        menu: undefined
    });

    const setMenuRef = React.useCallback(
        (type: NavStateNodeType, node: Element)=> {
            menuRef.current[type] = node
        },
        [ navContextState.id ]
    );

    return React.useMemo( ()=> (
            <div className={ className }>
                { taskbar.taskMenu.map( (menuItem, index)=> (
                    <Button.Basic
                        key={`TaskbarActionMenu_button_${menuItem.menuId}_${index}`}
                        btnRef={ navContextState.id[0] === menuItem.menuId ? setMenuRef.bind(null, 'trigger') : null }
                        className={ navContextState.id[0] === menuItem.menuId ? 'active' : '' }
                        size='MEDIUM' 
                        type='NAKED' 
                        icon={ menuItem.icon || undefined }
                        iconPosition='RIGHT'
                        disabled={ !menuItem.subMenu ? true : false }
                        title={ menuItem.displayName } 
                        htmlName={ menuItem.menuId }
                        onSingleClick={ ()=> {
                            if (navContextState.id.length === 0) {
                                navContextUpdate({
                                    type: 'SELECT',
                                    payload: {
                                        id: menuItem.menuId,
                                        source: 'taskbar',
                                        nodes: menuRef
                                    }
                                })
                            }
                        } } 
                    />
                ) )}
                {  navContextState.id.length > 0 && (
                        navContextState.id.map( (id, index)=> (
                            <Menu.Standard 
                                key={`TaskbarActionMenu_menu_${id}_${index}`}
                                menuRef={ setMenuRef.bind(null, 'menu') }
                                className={`${_taskbarMenuClassName}-menu`}
                                menuItem={ navContextState.menuItem(id) as SingleMenuItem }
                                positionX={ navContextState.position(id, 'menu')[0] }
                                onClick={ (menuItem)=> {
                                    if (!menuItem.subMenu) {
                                        appContextDispatch({
                                            type:'SELECT',
                                            payload: menuItem.appId as string
                                        })
                                    } else {
                                        // navContextUpdate({
                                        //     id: `taskbar__${menuItem.subMenu}`,
                                        //     element: event.currentTarget as HTMLElement
                                        // })
                                    }
                                } } 
                            />
                        ) )
                    ) 
                }
            </div>
        ), [ navContextState.id, navContextState.nodes ]
    )
};

export type TaskbarActionMenuProps = {
    className: string;
}
