# Builtin Types

With all these features, that opens us up to doing some pretty powerful things. Luckily, some of the most useful abilities of these previous features are builtin to typescript as builtin types.

---

## `Pick` type

This allows you to specify an interface, and pick what fields you want to extract from it into a new interface

```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}
```

Example:
```typescript
interface Foo {
    a: string; b: string; c: number; d: number;
}

type Bar = Pick<Foo, "a" | "c">;
/**
 {
    a: string;
    c: number;
}
 */
```

---

## `Partial` type

Takes an interface and makes every property optional

```typescript
type Partial<T> = {
    [P in keyof T]?: T[P] | undefined;
}
```

Example
```typescript
interface Foo {
    a: string; b: string; c: number; d: number;
}

type Bar = Partial<Foo>;
/**
{
    a?: string | undefined;
    b?: string | undefined;
    c?: number | undefined;
    d?: number | undefined;
}
 */
```

---

## `Record` type

Takes a union of string literals and a type, constructs an interface with those properties of that type

```typescript
type Record<K extends string | number | symbol, T> = {
    [P in K]: T;
}
```

Example
```typescript
type Bar = Record<"a" | "b" | "c", string>;
/**
{
    a: string;
    b: string;
    c: string;
}
 */
```

---

## `Readonly` and `Nullable` types

`Readonly<T>` takes an interface and adds `readonly` modifier to all properties.  
`Nullable<T>` takes an interface and makes every property allowed to be `null` in addition to its regular type