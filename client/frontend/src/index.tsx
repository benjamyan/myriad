import * as React from "react";
import * as ReactDOM from "react-dom";
// import { ApplicationContextProvider } from './providers';
// import { Generic } from "./utils";

import Desktop from "./views/Desktop";

ReactDOM.render(
    <React.StrictMode>
        <Desktop />
    </React.StrictMode>,
    document.getElementById("root")
);