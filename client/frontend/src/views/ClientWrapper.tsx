import * as React from 'react';

import { TaskbarMenu, ApplicationWrapper, SystemDock } from '../features';
import { useNavigationContext } from '../providers';
// import { DesktopArea } from './DesktopArea';

import "./_App.scss";

// const DesktopArea = ()=> {
//     const { navContextState } = useNavigationContext();

//     return (
//         <main className={navContextState.id.length > 0 ? 'inert' : ''} style={{ position:'relative', marginTop:35 }}>
//             <ApplicationWrapper />
//             <SystemDock />
//         </main>
//     )
// }

export const ClientWrapper = ()=> {
    // const { navContextState } = useNavigationContext();
    
    return (
        <>
            <TaskbarMenu />
            {/* <DesktopArea /> */}
            <main style={{ position:'relative', marginTop:35 }}>
                <ApplicationWrapper />
                <SystemDock />
            </main>
        </>
    )
}

// export default function Desktop() {
    
//     return (
//         <ApplicationContextProvider>
//             <NavigationContextProvider>
//                 <TaskbarMenu />
//                 <main style={{ position:'relative', marginTop:35 }}>
//                     <ApplicationWrapper />
//                     <SystemDock />
//                 </main>
//             </NavigationContextProvider>
//         </ApplicationContextProvider>
//     )
// }
