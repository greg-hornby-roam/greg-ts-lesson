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

Or recreate the interface with additional modifiers
```typescript
type ICarOptional = {
    [K in CarKeys]?: ICar[K];
}
/**
 {
    color?: "red" | "green" | "blue" | undefined;
    model?: string | undefined;
    date?: Date | undefined;
}
 */
```