# Access Interface property types

Give an interface, you can access types of properties on them via indexing

```typescript
interface IPerson {
    name: string;
    age: number;
    address: {
        streetName: string;
        streetNumber: number;
        city: string;
    }
}

type NameType = IPerson["name"]; //string
type AgeType = IPerson["age"]; //number
type AddressType = IPerson["address"]; //{streetName: string; streetNumber: number; city: string}
type CityType = IPerson["address"]["city"]; //string
```

---

With an array type, you can access the type of a single item using `number` as the index type.

```typescript
type Foo = string[];
type Bar = Foo[number]; //string
```

```typescript
type Foo = [string, number, Date];
type T0 = Foo[0]; //string;
type T1 = Foo[1]; //number;
type T2 = Foo[2]; //Date;
```