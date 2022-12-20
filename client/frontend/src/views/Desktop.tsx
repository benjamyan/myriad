import * as React from 'react';

import { ApplicationContextProvider, NavigationContextProvider } from '../providers';
import { TaskbarMenu, ApplicationWrapper, SystemDock } from '../features';
import "./_App.scss";

export default function Desktop() {
    
    return (
        <ApplicationContextProvider>
            <NavigationContextProvider>
                <TaskbarMenu />
                <ApplicationWrapper />
                <SystemDock />
            </NavigationContextProvider>
        </ApplicationContextProvider>
    )
}
