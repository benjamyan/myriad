import * as React from "react";
import * as ReactDOM from "react-dom";
import { Blog } from './views/Blog';

try {
    const customElement = document.getElementsByTagName('myriad-blog')[0].shadowRoot;
    if (customElement !== null) {
        ReactDOM.render(
            <React.StrictMode>
                <Blog />
            </React.StrictMode>,
            customElement.getElementById("myriad-blog")
        );
    } else {
        throw new Error('Cannot find shadow document')
    }
} catch (err) {
    console.log(err)

    const targetElement = document.getElementById("myriad-blog")
    if (targetElement !== null) {
        ReactDOM.render(
            <React.StrictMode>
                <Blog />
            </React.StrictMode>,
            targetElement
        );
    }
    
} finally {
    // console.log(document)
}