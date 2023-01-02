import * as React from 'react';

import { ApplicationContextProvider, NavigationContextProvider } from '../providers';
import { TaskbarMenu, ApplicationWrapper, SystemDock } from '../features';

import "./_App.scss";

export default function Desktop() {
    
    return (
        <ApplicationContextProvider>
            <NavigationContextProvider>
                <TaskbarMenu />
                <main style={{ position:'relative', marginTop:35 }}>
                    <ApplicationWrapper />
                    <SystemDock />
                </main>
            </NavigationContextProvider>
        </ApplicationContextProvider>
    )
}
