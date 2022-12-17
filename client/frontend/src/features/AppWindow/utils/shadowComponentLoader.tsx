import * as React from 'react';

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
}

export const shadowComponentLoader = (props: ComponentLoaderProps)=> {
    const style = props.html.getElementsByTagName('style')[0];
    const component = props.html.getElementsByTagName('section')[0];
    const script = props.html.getElementsByTagName('script')[0];
    
    const givenId = component.id;
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
                };
                if (!!script) {
                    this.shadowRoot?.appendChild(script);
                    window.eval(this.shadowRoot?.querySelector('script')?.innerText || '');
                };
                console.log(-1)
            } else {
                console.log(0)
            }
        }
        adoptedCallback() {
            console.log(99)
        }
        disconnectCallback() {
            console.log(1)
            if (!this.isConnected) {
                console.log(2)
            }
        }
    }
    if (!customElements.get(givenId)) {
        customElements.define(givenId, CustomWebComponent);
        return (
            <div 
                id={givenId}
                className={`${props.className}--content-article-inner`}
            />
        );
    }
}
