# Sauce: Constructing Database Return Types

In Sauce, we use knex to do our database operations. To do a basic select query looks like

```typescript
let query = this.Database.knex(MIdentity.$name)
.select([MIdentity.email, MIdentity.mobileNumber, MIdentity.verified]);

let result = await this.Query.Run<{
    email: string;
    mobileNumber: string;
    verified: string;
}>(query, {single: true});
```

As you can see it's very troublesome having to custom define the array of columns to select, and the returned interface.  
We could make this slightly better with the use of `Pick`.

```typescript
let result = await this.Query.Run<
    Pick<IIdentity, "email" | "mobileNumber" | "verified">
>(query, {single: true});
```

But we still have to make sure the columns in our pick match the columns in our select array.

---

Fortunately, there is a programmatic way to do this!
Because the columns we select don't have type `string` but are actually string literals of the column name itself, this means if we make an array of them, the array isn't of type `string[]`, but instead a union type of all the column names as string literals.

```typescript
let columns = [MIdentity.email, MIdentity.mobileNumber, MIdentity.verified];
/**
("email" | "mobileNumber" | "verified")[];
*/
```

And then we can unarray-ify that type using the number indexer.

```typescript
let columns = [MIdentity.email, MIdentity.mobileNumber, MIdentity.verified];

type IFields = (typeof columns)[number];
/**
"email" | "mobileNumber" | "verified"
*/
```

And then we can use that result in the `Pick` of `IIdentity`.  
So let's put it all together.

```typescript
let columns = [MIdentity.email, MIdentity.mobileNumber, MIdentity.verified];

let query = this.Database.knex(MIdentity.$name).select(columns);

let result = await this.Query.Run<Pick<IIdentity, (typeof columns)[number]>>(query, {single: true});
/**
{
    email: string;
    mobileNumber: string;
    verified: boolean;
}
*/
```

So we were able to use an array to tell the database what columns to select, and then we used typescript's features to turn that array into an interface.