export type MaybePromise<Value> = Value | PromiseLike<Value>

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [Key in string]: JsonValue }
  | JsonValue[]
  // undefined technically can't exist in json, but having it here makes things easier
  | undefined

/**
 * `typeof` normally includes number and symbols,
 * this type is a wrapper around it which only includes strings
 */
export type StringKeys<Type> = Extract<keyof Type, string>

export type OnlyString<Type> = Type extends string ? Type : never

export type ValueOf<Type> = Type[keyof Type]

/**
 * Merges two types, where the second type's properties override the first.
 * In other words, an intersection, but with object spread mechanics.
 *
 * Intersections like to "unionize" properties of the same name, this keeps that from happening.
 */
export type Merge<A, B> = Omit<A, keyof B> & B
