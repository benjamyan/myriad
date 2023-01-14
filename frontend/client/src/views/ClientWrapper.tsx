import * as React from 'react';

import { TaskbarMenu, ApplicationWrapper, SystemDock, DesktopArea } from '../features';

import "./_App.scss";

export const ClientWrapper = ()=> {
    // const { navContextState } = useNavigationContext();
    
    return (
        <>
            <TaskbarMenu />
            <main>
                <ApplicationWrapper />
                <DesktopArea />
                <SystemDock />
            </main>
        </>
    )
}
