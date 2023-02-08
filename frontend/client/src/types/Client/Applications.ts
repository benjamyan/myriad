import { IconType } from "react-icons";
import { svg,png } from 'myriad-icons';
import { AxiosRequestConfig } from 'axios';
import React from "react";

import { TsUtil } from '../';


export type ApplicationDomOptionType = 'dimensions' | 'positions';
export type ApplicationDomOptionsValueElement = number | `${number}%`;
export type ApplicationDomPositionXOptionsValueElement = number | `${number}%` | 'right' |'middle' |  'left';
export type ApplicationDomPositionYOptionsValueElement = number | `${number}%` | 'top' | 'middle' | 'bottom';

export type ApplicationDomOptionsValue = (
    TsUtil.Tuple<ApplicationDomOptionsValueElement | keyof ApplicationDomOptions, 2>
);
export type ApplicationDomValueCalculated = (
    // TsUtil.Tuple<number, 2>
    TsUtil.Tuple<ApplicationDomOptionsValueElement, 2>
);
// export type ApplicationDomPositionOptionsValue = [
//     ApplicationDomPositionXOptionsValueElement | keyof ApplicationDomOptions,
//     ApplicationDomPositionYOptionsValueElement | keyof ApplicationDomOptions
// ];
export type ApplicationDomPositionOptionsValue = (
    TsUtil.Tuple<ApplicationDomPositionXOptionsValueElement | ApplicationDomPositionYOptionsValueElement | keyof ApplicationDomOptions, 2>
);
export type ApplicationDomPositionOptionsValueCalculated = (
    TsUtil.Tuple<ApplicationDomPositionXOptionsValueElement | ApplicationDomPositionYOptionsValueElement, 2>
);

export type ApplicationDomOptions = {
    default: ApplicationDomOptionsValue;
    /** TODO support various key references in the value */
    [key: `${'x' | 'y'}${number}`]: TsUtil.Tuple<ApplicationDomOptionsValueElement, 2>;
}

export type ApplicationDomPositionOptions = {
    default: ApplicationDomPositionOptionsValue;
    /** TODO support various key references in the value */
    [key: `${'x' | 'y'}${number}`]: ApplicationDomPositionOptionsValue;
}

export type ApplicationDefinition = {
    /** Application ID for reference */
    readonly appId: string;
    /** Title/name to be shown to user */
    readonly displayName: string;
    /** An associated icon as URL */
    readonly icon?: typeof svg | typeof png | IconType | string;
    /** 
     * Application dimensions given as key/value pairs of `{ string: Array<number | string, number | string> }`
     * @type `key` represents the usage of the value pair. `default` is given always, with optional properties defining media queries
     * @type `value` is a tuple representing the `width X height`
     * @propererty `default` the baseline dimensions to be used 
     * @property `(width | height){number}` where `number` is the _min-width_ or _min-height_ to be used in accordance with CSS media query `min-width` standard
     * - `width600:[500,'75%']` would render the width at 500px and the height at 75% of the viewport
     * - `width600:['default', '75%']` will render 75% viewport height, and use the required _default_ property declared
     * @optional Optional overrides 
     * - TODO: this value can refer to __other__ keys here, and be applied as such. Ie if you pass the `height` value as `'default'`, the it will use the height set by the `default` value (`dimensions.default[1]`)
     * - TODO support for `height${number}` not yet implemented
     * */
    dimensions?: ApplicationDomOptions;
    /** 
     * Positions as `[ X, Y ]` 
     * - @see {@link ApplicationDefinition.dimensions}
     * - X accepts 'right' |'middle' |  'left'
     * - Y accepts 'middle' | 'top' | 'bottom
    */
    positions?: ApplicationDomPositionOptions; // ApplicationDomOptions;
    // positions?: [number | string, number | string];
    /** The source URL as string for remote or local content fetch */
    readonly sourceUrl?: string;
    /** 
     * The souces content type so we can correcly render - this can either be the returned type from the URL, or a static file
     * - If youre using `API`, you should be passing the params as a JSON object that can be called with the URL under `sourceConfig`
     * - Content of type `HTML` will be rendered inside a custom web component with its own shadow DOM to avoid pesky crashes and what-not
     */
    readonly sourceType: 'JSON' | 'MD' | 'HTML' | 'MEDIA';
    /** Configuration if you're making an API call and need to pass custom headers */
    readonly sourceConfig?: AxiosRequestConfig;
    /** Pass in static content here to omit URL/API calls completely - if this is not undefined on read it will nullify all other `source` entries */
    readonly sourceContent?: string | JSON;
    /** 
     * If you want to handle rendering on your own pass a custom element reference - can only be done with contentType of `JSON` or `MD` 
     * - @param content as a string or JSON for content to render
     * - @param options are any options you might need for the component itself
     */
    renderContent?: ApplicationRenderComponent | ((args0: ApplicationRenderProps<any>)=> JSX.Element);
}

export interface ApplicationRenderProps<C extends any> {
    /**
     * @param content is the actual content to be passed to your custom component 
     * - `'OFFLOAD'` if loading of data is being handled by the component itself
     * - `'LOADING'` as a <string> if youre currently loading in the content from elsewhere, and it should expect it later down the line
     * - Pass a JSON object if its loaded correctly and should render as such
     * - `Error` if you need to display an error on client  
     */
    content: 'OFFLOAD' | 'LOADING' | Error | C; 
    options?: Record<string, any> & {
        windowRef?: React.RefObject<HTMLElement>;
    };
}
export type ApplicationRenderComponent = (props: ApplicationRenderProps<JSON | string>)=> JSX.Element;
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
    /** positions as `[ X, Y ]` */
    positions: ApplicationDomValueCalculated; // ApplicationDomOptionsValue;
    /** dimensions as `[ W, H ]` */
    dimensions: ApplicationDomValueCalculated; // ApplicationDomOptionsValue;

    _controlled: boolean;
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
