import * as React from "react";
import * as ReactDOM from "react-dom";
import { Blog } from './views/Blog'

// window.custom = {};

// export initCustomRender

(function() {
    (window as any).initCustomRender = function(target: Document, mountId: string) {
        ReactDOM.render(
            <React.StrictMode>
                <>
                    Hello blog!
                    <Blog />
                </>
            </React.StrictMode>,
            target.getElementById(mountId)
        );
    }
})();



// try {
//     ReactDOM.render(
//         <React.StrictMode>
//             <>Hello blog!</>
//         </React.StrictMode>,
//         document.getElementById("myriad-blog")
//     );
// } catch (err) {
//     console.log(err)
// } finally {
//     console.log(document)
// }