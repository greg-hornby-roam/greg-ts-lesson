# The `infer` operator

Extending on from conditional types, a new keyword called `infer` has been introduced, which allows us to extract a generic parameter from a type.


In this example, we create a type that can unwrap an array to it's original type. If we pass in a non-array type, it just returns the same type.
Note how it can only unwrap one dimension of an array in the `T2` example.
```typescript
type Unarrayify<T> = T extends Array<infer U> ? U : T;

type T0 = Unarrayify<string[]>; //string
type T1 = Unarrayify<number>; //number;
type T2 = Unarrayify<any[][]>; //any[];
```

---

If we want to create an `Unarrayify` type  that can only accept array types, we can do it like so
```typescript
type Unarrayify<T extends Array<any>> = T extends Array<infer U> ? U : never;

type T0 = Unarrayify<string[]>; //string
type T1 = Unarrayify<number>; //[ts] Type 'number' does not satisfy the constraint 'any[]'.
```

Here we say T must extend the Array type, so we can only pass arrays to the type. The return type if the condition evaluates to false is `never` because with our type guard, this condition will never happen.

---

With this new keyword, typescript has also introduced some new built-in types.

+ Exclude<T, U> -- Exclude from T those types that are assignable to U.
+ Extract<T, U> -- Extract from T those types that are assignable to U.
+ NonNullable<T> -- Exclude null and undefined from T.
+ ReturnType<T> -- Obtain the return type of a function type.
+ InstanceType<T> -- Obtain the instance type of a constructor function type.

---

A useful type that's not builtin I like to use is to unpromisify a type. This can be done like so

```typescript
type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

async function Foo(): Promise<number> {
    return Promise.resolve(5);
}

type T0 = ReturnType<typeof Foo>; //Promise<number>;
type T1 = PromiseType<T0>; //number;
```