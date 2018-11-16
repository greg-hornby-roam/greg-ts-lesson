# `keyof` Operator

You can use the `keyof` operator to extract a string literal union type of the keys of an interface.

```typescript
interface ICar {
    color: "red" | "green" | "blue";
    model: string;
    date: Date;
}

type CarKeys = keyof ICar; //"color" | "model" | "date"
```

You could use this keys type to recreate the interface
```typescript
type ICar2 = {
    [K in CarKeys]: ICar[K];
}
```

Note that you can also use `keyof` inline
```typescript
type ICar2 = {
    [K in keyof ICar]: ICar[K];
}
```

Or recreate the interface with additional modifiers
```typescript
type ICarOptional = {
    [K in keyof ICar]?: ICar[K];
}
/**
 {
    color?: "red" | "green" | "blue" | undefined;
    model?: string | undefined;
    date?: Date | undefined;}
 */
```

```typescript
type ICarReadonly = {
    readonly [K in keyof ICar]: ICar[K];
}
/**
{
    readonly color: "red" | "green" | "blue";
    readonly model: string;
    readonly date: Date;
}
 */
```

---

Note that if your interface properties already have modifieds, these will be carried over

```typescript
interface IModdedCar {
    readonly color?: "red" | "green" | "blue";
    readonly model?: string;
    readonly date?: Date;
}

type IModdedCarRecreated = {
    [K in keyof IModdedCar]: IModdedCar[K];
}
/**
 {
    readonly color?: "red" | "green" | "blue";
    readonly model?: string;
    readonly date?: Date;
}
*/
```

You can remove modifiers using subtraction

```typescript
type IOptionalCar = {
    -readonly [K in keyof IModdedCar]: IModdedCar[K];
}
/**
{
    color?: "red" | "green" | "blue";
    model?: string;
    date?: Date;
}
*/
```

```typescript
type IReadonlyCar = {
    [K in keyof IModdedCar]-?: IModdedCar[K];
}
/**
{
    readonly color: "red" | "green" | "blue";
    readonly model: string;
    readonly date: Date;
}
*/
```

```typescript
type IOriginalCar = {
    -readonly [K in keyof IModdedCar]-?: IModdedCar[K];
}
/**
{
    color: "red" | "green" | "blue";
    model: string;
    date: Date;
}
*/
```