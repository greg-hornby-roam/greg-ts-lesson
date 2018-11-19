# Condtional Types

In Typescript 2.8, conditional types were introduced. This allows to switch the output type, given an `extends` constraint with a generic.

In this example, we create a type that takes a generic `T` and converts it to an array if it is not already, if T already is an array, it is left alone.

```typescript
type Arrayify<T> = T extends Array<any> ? T : T[];

type T0 = Arrayify<string[]>; //string[]
type T1 = Arrayify<number>; //number[];
type T2 = Arrayify<{a: string; b: number}>; //{a: string; b: number}[];
```

---

In another example, we can create a type that accepts a generic `T` and outputs a string literal of its type (the same as would be returned by the `typeof` operator)

```typescript
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;  // "string"
type T2 = TypeName<true>;  // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;  // "object"
```