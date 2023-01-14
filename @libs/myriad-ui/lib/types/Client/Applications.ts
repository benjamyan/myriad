import { IconType } from "react-icons";
// import { AxiosRequestConfig } from 'axios';

export type ApplicationDefinition = {
    /** Application ID for reference */
    readonly appId: string;
    /** Title/name to be shown to user */
    readonly displayName: string;
    /** An associated icon as URL */
    readonly icon?: IconType | string;
    /** Dimensions as `[ W, H ]` */
    dimensions?: [number | string, number | string];
    /** The source URL as string for remote or local content fetch */
    readonly sourceUrl?: string;
    /** 
     * The souces content type so we can correcly render - this can either be the returned type from the URL, or a static file
     * - If youre using `API`, you should be passing the params as a JSON object that can be called with the URL under `sourceConfig`
     * - Content of type `HTML` will be rendered inside a custom web component with its own shadow DOM to avoid pesky crashes and what-not
     */
    readonly sourceType: 'JSON' | 'MD' | 'HTML';
    /** Configuration if you're making an API call and need to pass custom headers */
    readonly sourceConfig?: any; // AxiosRequestConfig;
    /** Pass in static content here to omit URL/API calls completely - if this is not undefined on read it will nullify all other `source` entries */
    readonly sourceContent?: string | JSON;
    /** 
     * If you want to handle rendering on your own pass a custom element reference - can only be done with contentType of `JSON` or `MD` 
     * - @param content as a string or JSON for content to render
     * - @param options are any options you might need for the component itself
     */
    renderContent?: ApplicationRenderComponent;
}

export interface ApplicationRenderProps<C extends any = JSON> {
    /**
     * @param content is the actual content to be passed to your custom component 
     * - `'OFFLOAD'` if loading of data is being handled by the component itself
     * - `'LOADING'` as a <string> if youre currently loading in the content from elsewhere, and it should expect it later down the line
     * - Pass a JSON object if its loaded correctly and should render as such
     * - `Error` if you need to display an error on client  
     */
    content: 'OFFLOAD' | 'LOADING' | Error | C; 
    options?: Record<string, any>;
}
export type ApplicationRenderComponent = (props: ApplicationRenderProps)=> JSX.Element;
// export type ApplicationRenderComponent = ({ content, options }: { 
//         /**
//          * @param content is the actual content to be passed to your custom component 
//          * - `'OFFLOAD'` if loading of data is being handled by the component itself
//          * - `'LOADING'` as a <string> if youre currently loading in the content from elsewhere, and it should expect it later down the line
//          * - Pass a JSON object if its loaded correctly and should render as such
//          * - `Error` if you need to display an error on client  
//          */
//         content: 'OFFLOAD' | 'LOADING' | Error | (
//             C extends void ? JSON : C
//         ), 
//         options?: Record<string, any>
//     })=> JSX.Element;

export type ActiveApplication = {
    // [key: string]: number | string | boolean | Error | any[];
    /** Application ID for reference */
    readonly appId: ApplicationDefinition['appId'];
    /** So we can have multiple instances of the same kind of applicaton at once in memeory */
    readonly instanceId: string;
    /** position as `[ W, H ]` */
    positions: [number , number ];
    /** dimensions as `[ W, H ]` */
    dimensions: [number | string, number | string];
    /** Application is minized or not */
    _visibility: 'MINIMIZED' | 'DEFAULT' | 'MAXIMIZED';
    /** 
     * Flag for loading status and any errors 
     * - `false` if loading or qeued
     * - `true` if all ops run and content ready
     * - `Error` for baked beans
     */
    _ready: boolean | Error;
}
