
// export type ExtractTypeByPropKey<A, T> = A extends { type: T } ? A : never;

// export type ExtractValueByPropKey2<A, T, K> = A extends { type: T } ? A[Extract<keyof A, K>] : never;

export type ExtractValueByPropKey<A, T, K extends void | string = void> = A extends { type: T } ? K extends void ? A : A[Extract<keyof A, K>] : never;