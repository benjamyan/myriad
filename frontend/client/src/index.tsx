import * as React from "react";
import * as ReactDOM from "react-dom";
import { ApplicationContextProvider, NavigationContextProvider, ClientSettingsContextProvider } from "./providers";

import { ClientWrapper } from "./views/ClientWrapper";

ReactDOM.render(
    <React.StrictMode>
        <ApplicationContextProvider>
            <NavigationContextProvider>
                <ClientSettingsContextProvider>
                    <ClientWrapper />
                </ClientSettingsContextProvider>
            </NavigationContextProvider>
        </ApplicationContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);