import * as React from 'react';

import { useApplicationContext, useNavigationContext, NavigationContextProvider } from '../providers';
import { TaskbarMenu, ApplicationWindow } from '../features';
import "./_App.scss";

export default function Desktop() {
    const { appContextState, appContextDispatch } = useApplicationContext();
    // const {} = useNavigationContext();

    // const taskbarRef = React.useRef<HTMLDivElement>(null);
    // const desktopRef = React.useRef<HTMLDivElement>(null);

    return (
        <NavigationContextProvider>
            <TaskbarMenu />
            <main style={{ position:'relative', marginTop:35 }}>
                { appContextState.active.length > 0 && 
                    appContextState.active.map(
                        (application)=> <ApplicationWindow appContextItem={application} />
                    )
                }
            </main>
        </NavigationContextProvider>
    )
}
