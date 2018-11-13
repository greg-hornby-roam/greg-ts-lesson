If you need an object that works as a hashmap and can store a variety of keys, consider using an index type.  
An index type works by creating an interface where you define the type of the key (usually just `string`), and the type of the value.

For example, say we want to build an object, mapping the alphabet letters to their numerical value. We could create an interface with 26 properties, or we could use the `any` type, but then that gives no context into the structure of our object. So how about an indexed type!
```typescript
type IAlphabetNumbers = {
    [key: string]: number;
}
```

The key is the alphabet letter (therefore a `string`), and it maps to a `number`.

---

In a code example
```typescript
type IAlphabetNumbers = {
    [key: string]: number;
}
let alphabetNumbers: IAlphabetNumbers = {};

let startingAscii = 64; //The character before 'A'
for (let n = 1; n <= 26; n++) {
    let letter = String.fromCharCode(startingAscii+n);
    alphabetNumbers[letter] = n;
}
```

`alphabetNumbers` yield this object
```
{A: 1, B: 2, C:3, D:4, ..., X: 24, Y: 25, Z: 26}
```