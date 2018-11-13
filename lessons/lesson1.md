˜One of the strongest abilities of typescript is the `any` type.
It allows you to assert your will when you know better than the compiler.
It's useful for things like when you're using 3rd party typings that may not be 100% correct,
then you can use `any` to force the compiler to accept what you're doing as valid.

Let's say we have a module called `TestModule` with an exported function `foo`.
You know from reading the documentation that `foo` can take either a string or a number,
but the typings you have installed only allows a string. Trying to use a number will yield a compile-time error,
but if we cast to any, we can get away with using a number as the argument.

```typescript
let n = 5;
let x1 = TestModule.foo(n); `[ts] Argument of type 'number' is not assignable to parameter of type 'string'.`
                        ~
let x2 = TestModule.foo(n as any); //Works
```
