{
    const TestModule = {
        foo(a: string) {}
    }

    let x1 = TestModule.foo(5); //Error

    let x2 = TestModule.foo(5 as any); //Works
}