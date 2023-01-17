import { menuItemById } from '../utils';
import { taskbar } from '../../../config';

export const build_subMenuProps = (activeMenuItemId: string, menuRef: React.MutableRefObject<HTMLDivElement>)=> {
    const menuItem = menuItemById(activeMenuItemId, taskbar.taskMenuItems);
    const hasSubmenu = menuItem.subMenu !== undefined;

    return {
        hasSubmenu,
        menuItem,
        positionX: function() {
            if (hasSubmenu) {
                let currentChild;
                for (const child of Array.from(menuRef.current.children)) {
                    if (child.nodeName === 'BUTTON') {
                        currentChild = child as HTMLButtonElement;
                        if (currentChild.name === activeMenuItemId) {
                            break;
                        }
                    }
                }
                return currentChild?.offsetLeft
            }
            return 0
        }()
    };
};
