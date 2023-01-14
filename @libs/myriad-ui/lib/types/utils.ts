
// export type ExtractTypeByPropKey<A, T> = A extends { type: T } ? A : never;

// export type ExtractValueByPropKey2<A, T, K> = A extends { type: T } ? A[Extract<keyof A, K>] : never;

/** TS fn to reliably get an individual type from a union or intersection  
 * - @param A is the union/intersectional type you need to check against
 * - @param T should be a _value_ to check against the provided types `key:value` pairs
 * - @param K is an _optional_ generic representing a `key` value to be returned when a match is found
 *      - @if `K` is not provided, the entire type that passes our check will be returned 
 *      - @else we will get back the specified `key:value` pairing that passed the check
 */
export type ExtractValueByPropKey<A, T, K extends void | string = void> = (
    A extends { type: T } 
        ? K extends void 
            ? A 
            : A[Extract<keyof A, K>] 
        : never
);
