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

export type OnlyString<Type> = Type extends string ? Type : never
