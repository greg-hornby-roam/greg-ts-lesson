# Extend `global` namespace

So now we know how to define useful types, but can we use them wherever we want without having to manually import the type or redefine it in each file?  

Yes we can!

Create a new file anywhere in your typescript source code, and you can augment the `global` namespace like so.

```typescript
export { };

declare global {
    type PromiseType<T> = T extends PromiseLike<infer U> ? U : never;
}
```

You'll notice we have an empty export statement. There must be at least one export in the file for it to count as a module (I don't entirely udnerstand why the file has to count as module), so we just add an empty object export.  
Don't worry, this little workaround is recommended by the typescript handbook.