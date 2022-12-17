import * as React from 'react';

import { useApplicationContext, NavigationContextProvider } from '../providers';
import { TaskbarMenu, ApplicationWindow, DesktopApplicationWindowWrapper } from '../features';
import "./_App.scss";

export default function Desktop() {
    // const { appContextState, appContextDispatch } = useApplicationContext();
    // const {} = useNavigationContext();

    // const taskbarRef = React.useRef<HTMLDivElement>(null);
    // const desktopRef = React.useRef<HTMLDivElement>(null);

    return (
        <NavigationContextProvider>
            <TaskbarMenu />
            <main style={{ position:'relative', marginTop:35 }}>
                <DesktopApplicationWindowWrapper />
                {/* { appContextState.active.length > 0 && 
                    appContextState.active.map(ApplicationWindow)
                } */}
            </main>
        </NavigationContextProvider>
    )
}
