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