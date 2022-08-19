import * as React from 'react';

import { TaskbarActionMenu } from './components/TaskbarActionMenu';
import { UtilityPane } from './components/UtilityPane';
import "./_TaskbarMenu.scss";

const _baseClassName = 'taskbar__menu';

export const TaskbarMenu = ({taskbarRef}:any)=> {
    const [ menuActive, setMenuActive ] = React.useState<string | false>(false);

    React.useEffect( ()=>{
        if (menuActive !== false) {
            // add
        } else {
            // remove
        }
    }, [ menuActive ])

    return (
        <nav className={ _baseClassName } ref={taskbarRef}>
            <i className={`${_baseClassName}--logo`} />
            <TaskbarActionMenu className={`${_baseClassName}--actions`} />
            <UtilityPane className={`${_baseClassName}--panel`} />
        </nav>
    )
}
