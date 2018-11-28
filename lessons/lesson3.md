# Literal Types

In typescript, the `string`, `number` and `boolean` types can be split even further into literal types.  
You can define types as actuals strings, numbers or true/false.

```typescript
let x: "hello";
x = "world"; //[ts] Type '"world"' is not assignable to type '"hello"'`
x = "hello"; //fine

let y: 42;
let z: number;
y = z; //[ts] Type 'number' is not assignable to type '42'.
z = y; //fine
```

---

This is more useful in union types in function arguments

```typescript
function PositionElement(
    elem: HTMLElement,
    pos: "top"| "bottom" | "left" | "right"
) {
    if (pos === "top") {
        //code
    } else if (pos === "bottom") {
        //code
    } else if (pos === "left") {
        //code
    } else if (pos === "right") {
        //code
    }
}

let e = document.getElementById("foo")!;

//fine
PositionElement(e, "top");

//[ts] Argument of type '"center"' is not assignable to parameter of type '"top" | "bottom" | "left" | "right"'.
PositionElement(e, "center");
```

---

Union types of string literals can be iterated through to generate interfaces.

```typescript
type Props = "hello" | "world";
type IFoo = {
    [K in Props]: string;
}

/* IFoo evaluates to
{
    hello: string;
    world: string;
}
*/
```