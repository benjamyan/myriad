export default {}

// export type MyriadComponentInsert = {
//     /** A component to prepend at the beginning of the component */
//     Component: JSX.Element;
//     /** The position at which the component should be inserted 
//      * - `before-begin` will prepend the component at the very start
//      * - `after-begin` will prepend the component at the very start
//      * - `before-end` will prepend the component at the very start
//      * - `after-end` will prepend the component at the very start
//      */
//     insertPosition: 'before-begin' | 'after-begin' | 'before-end' | 'after-end';
// }

export interface MyriadFrontendComponentOptions {
    /** The component type you want to render - defaults to `application` if not provided */
    componentType?: 'widget' | 'application';
    /** An optional component to show before data is loaded */
    // InitialComponent?: JSX.Element;
    /** A component to insert from outside the micro-frontends environment - follows the same standard as the es5 `insertAdjacentHtml` api
     * - `before-begin` will prepend the component at the very start
     * - `after-begin` will be appended after the beginning of the wrapper element
     * - `before-end` will be inserted right before the ending wrapper element
     * - `after-end` will append to the end of the component
     */
    insertComponent?: Partial<Record<'BeforeBegin' | 'AfterBegin' | 'BeforeEnd' | 'AfterEnd', JSX.Element>>
    // insertComponent?: MyriadComponentInsert[];
    // PrependComponent?: JSX.Element;
    /** The position at which the component should be inserted 
     * - `before-begin` will prepend the component at the very start
     * - `after-begin` will prepend the component at the very start
     * - `before-end` will prepend the component at the very start
     * - `after-end` will prepend the component at the very start
     */
    // prependPosition: 'before-begin' | 'after-begin' | 'before-end' | 'after-end';
    /** A component to insert at the end of the component */
    // AppendComponent?: JSX.Element;

    // appendPosition: 'before-begin' | 'after-begin' | 'before-end' | 'after-end';
}

export interface MyriadFrontendOptions extends MyriadFrontendComponentOptions {
    /** If set to true, the instanciating component/parent will handle messages and stateful loaders 
     * @if `true` - you will need to: 
     * - Provide all content/data yourself
     * - Pass down the state OF the content/data 
     */
    overrideStatefulLoadingHandler?: boolean;
    /** Override API call and use the provided `componentData` prop */
    overrideComponentApiData?: boolean;
    /** Pass in data to be used for the application 
     * @if You want to use this _instead_ of the interal API call - set `overrideComponentApiData` as `true`
     */
    componentData?: any; // Record<string, string | number | boolean> | JSON | string;
    /** Overwrite URL and any API parameters here */
    apiParams?: Record<string, string | boolean | number> & {
        url?: string;
    };
}
