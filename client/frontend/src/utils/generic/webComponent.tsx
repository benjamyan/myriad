import * as React from "react";
import * as ReactDOM from "react-dom";

(window as any).initCustomRender = function(target: Document | ShadowRoot, Node: React.ReactElement) {
    try {
        if (target === undefined) {
            throw new Error('target node is undefined')
        } else if (Node === undefined) {
            throw new Error('Node is underinfed')
        } else {
            ReactDOM.render(
                <React.StrictMode>
                    { Node }
                </React.StrictMode>,
                target
            );
        }
    } catch (err) {
        console.log(err)
    }
}
