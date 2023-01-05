import * as React from "react";
import * as ReactDOM from "react-dom";
import { ApplicationContextProvider, NavigationContextProvider, ClientSettingsContextProvider } from "./providers";

import { ClientWrapper } from "./views/ClientWrapper";

ReactDOM.render(
    <React.StrictMode>
        <ClientSettingsContextProvider>
            <ApplicationContextProvider>
                <NavigationContextProvider>
                    <ClientWrapper />
                </NavigationContextProvider>
            </ApplicationContextProvider>
        </ClientSettingsContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);