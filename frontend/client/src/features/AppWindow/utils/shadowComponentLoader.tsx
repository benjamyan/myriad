import * as React from 'react';
import ReactDOM from 'react-dom';

// const ComponentNode = (givenId: string, className: string)=> React.createElement(
//     givenId, 
//     { 
//         // ref: unmountRef.current, 
//         class: `${className}--content-article-inner`,
//         onCompositionEnd() {
//             console.log('end')
//         },
//         onCompositionStart() {
//             console.log('start')
//         },
//         onCompositionUpdate() {
//             console.log('update')
//         },
//         componentWillMount() {
//             console.log('mounted')
//         },
//         componentDidUnmount() {
//             console.log('unmount')
//         },
//         unmountComponent() {
//             console.log('unmount')
//         }
//     }
// );

export type ComponentLoaderProps = {
    html: Document;
    className: string;
    refHandler: React.RefObject<HTMLElement>
}

export const shadowComponentLoader = (props: ComponentLoaderProps)=> {
    const style = props.html.getElementsByTagName('style')[0];
    const component = props.html.getElementsByTagName('section')[0];
    const script = props.html.getElementsByTagName('script')[0];
    const givenId = component.id;

    // const MountPoint = document.createElement('div');

    class CustomWebComponent extends HTMLElement {
        constructor() {
            super();
        }
        connectedCallback() {
            if (this.isConnected) {
                this.attachShadow({ mode: 'open' });
                if (!!style) {
                    this.shadowRoot?.appendChild(style);
                };
                if (!!component) {
                    this.shadowRoot?.appendChild(component);
                    // for (const node of Array.from(component.querySelectorAll('*'))) {
                    //     this.shadowRoot?.appendChild(node);
                    // }
                };
                if (!!script) {
                    this.shadowRoot?.appendChild(script);
                    window.eval(this.shadowRoot?.querySelector('script')?.innerText || '');
                };
            } else {
                console.error(`Unhandled exception mounting shadowRoot`)
            }
        }
        // adoptedCallback() {
        //     console.log(99)
        // }
        disconnectCallback() {
            console.log('Disconnect')
            if (!this.isConnected) {
                console.log('Disconnect success')
            }
        }
    }
    if (!customElements.get(givenId)) {
        customElements.define(givenId, CustomWebComponent);
        // customElements
        //     .whenDefined(givenId)
        //     .then(()=>console.log('Mounted'))
        // React.createElement(givenId)
        return React.createElement(
            givenId, 
            { 
                ref: props.refHandler, 
                // class: props.windowClassname,
                // onCompositionEnd() {
                //     console.log('end')
                // },
                // onCompositionStart() {
                //     console.log('start')
                // },
                // onCompositionUpdate() {
                //     console.log('update')
                // },
                // componentWillMount() {
                //     console.log('mounted')
                // },
                // componentDidUnmount() {
                //     console.log('unmount')
                // }
            }
        );;
        // return <>{ customElements.get(givenId) }</>
        // return (
        //     <div 
        //         id={givenId}
        //         className={`${props.className}--content-article-inner`}
        //     />
        // );
    }
    // return <></>
}
