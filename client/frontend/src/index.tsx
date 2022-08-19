import * as React from "react";
import * as ReactDOM from "react-dom";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd';
import { ApplicationContextProvider, NavigationContextProvider } from './providers';

import Desktop from "./views/Desktop";

ReactDOM.render(
    <React.StrictMode>
        {/* <NavigationContextProvider> */}
            <ApplicationContextProvider>
                <Desktop />
            </ApplicationContextProvider>
        {/* </NavigationContextProvider> */}
    </React.StrictMode>,
    document.getElementById("root")
);