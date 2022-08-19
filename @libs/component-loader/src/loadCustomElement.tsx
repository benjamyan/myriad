import * as React from "react";
import * as ReactDOM from "react-dom";

export function initCustomRender(target: Document, componentId: string) {
    ReactDOM.render(
        <React.StrictMode>
            <>Hello blog!</>
        </React.StrictMode>,
        target.getElementById(componentId)
    );
};

// export function declareInitOnWindow() {
//     return initCustomRender
// }
