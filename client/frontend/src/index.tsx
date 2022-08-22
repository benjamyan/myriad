import * as React from "react";
import * as ReactDOM from "react-dom";
import { ApplicationContextProvider } from './providers';
// import { Generic } from "./utils";

import Desktop from "./views/Desktop";

ReactDOM.render(
    <React.StrictMode>
        <ApplicationContextProvider>
            <Desktop />
        </ApplicationContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);