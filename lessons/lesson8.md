# Overloads

In typescript, method overloading behaves differently to other languages because typescript compiles to javascript which has no notion of method overloading.  

Typescript's solution is to allow you to define multiple signatures for a function or method, and then to create an implementation whose implementation must be compatible with the overload signatures.
When typing a call the function/method, the implementation signature is not shown in the list of possible overloads, only the other signatures defined will show, as you will not usually want the implementation signature to be selectable.

In this example, we'll define a method that can either take 2 arguments of type string, or 2 arguments of type number, and how we can reconcile that into a compatible implementation signature
```typescript
Bar(stringInput: string, otherParam: string): void; //Overload 1
Bar(numberInput: number, otherParam: number): void; //Overload 2
Bar(input: string | number, _otherParam: string | number) { //Implementation

    if (typeof input === "string") {
        let otherParam: string = _otherParam as string;
        console.log("Strings:", input, otherParam);
    } else if (typeof input === "number") {
        let otherParam: number = _otherParam as number;
        console.log("Numbers:", input, otherParam);
    }
}
```


What if we want to define some overloads with different amount of arguments and argument types.

```typescript
class Point {constructor(public x: number, public y: number) {}}

class MyCanvas {
    
    Draw4SidedPolygon(bounds: [Point, Point, Point, Point]): void;
    Draw4SidedPolygon(p1: Point, p2: Point, p3: Point, p4: Point): void;
    Draw4SidedPolygon(
        p1x: number, p1y: number,
        p2x: number, p2y: number,
        p3x: number, p3y: number,
        p4x: number, p4y: number
    ): void;
    Draw4SidedPolygon(...args: any[]): void {

        let bounds: [Point, Point, Point, Point];

        if (args.length === 1) {
            bounds  = args[0];
        } else if (args.length === 4) {
            bounds = [args[0], args[1], args[2], args[3]];
            // bounds = [...args] as typeof bounds; <-- This is equivalent. Requires an `as` assertion though.
        } else if (args.length === 8) {
            bounds = [
                new Point(args[0], args[1]),
                new Point(args[2], args[3]),
                new Point(args[4], args[5]),
                new Point(args[6], args[7]),
            ];
        }

        //Code to draw a polygon using our `bounds` array
    }
}
```

```typescript
let canvas = new MyCanvas();

let p1 = new Point(-1, -1);
let p2 = new Point(1, -1);
let p3 = new Point(1, 1);
let p4 = new Point(-1, 1);

canvas.Draw4SidedPolygon([p1, p2, p3, p4]);

canvas.Draw4SidedPolygon(p1, p2, p3, p4);

canvas.Draw4SidedPolygon(-1, -1, 1, -1, 1, 1, -1, 1);
```