# Functions

Functions are reusable blocks of code that may accept parameters and optionally return a value. Every executable Azin program begins execution in the `main` function.

---

## Declaring Functions

Functions are declared using the `fn` keyword.

```azin
fn add(a: int, b: int): int do
    return a + b;
end
```

A function declaration consists of:

* the `fn` keyword,
* the function name,
* an optional parameter list,
* an optional return type,
* the function body.

The function body begins with `do` and ends with `end`.

---

## Zero-Parameter Functions

Functions that do not accept parameters omit the parameter list.

```azin
fn version: string do
    return "0.1.0";
end
```

Functions without parameters and without a return value are written as follows.

```azin
fn initialize do
    print("Initializing...");
end
```

The following declarations are equivalent.

```azin
fn version: string do
    return "0.1.0";
end
```


```azin
fn version(): string do
    return "0.1.0";
end
```

The parameter-less form is available only for functions that accept no parameters.

---

## Parameters

Parameters are declared inside parentheses.

```azin
fn greet(name: string) do
    print(name);
end
```

Multiple parameters are separated by commas.

```azin
fn clamp(value: int, minimum: int, maximum: int): int do
    ...
end
```

Each parameter consists of an identifier followed by its type.

```text
name: Type
```

Parameter names must be unique within the same function declaration.

```azin
fn add(a: int, a: int): int do
    ...
end
```

The declaration above is invalid because both parameters use the same identifier.

Parameters may shadow identifiers from outer scopes.

---

## Return Types

A return type is specified after the parameter list using `:`.

```azin
fn length(text: string): int do
    ...
end
```

If no return type is specified, the function does not return a value.

```azin
fn log(message: string) do
    print(message);
end
```

---

## Returning

Use the `return` statement to exit a function.

Functions with a return type must return a value compatible with the declared type.

```azin
fn square(x: int): int do
    return x * x;
end
```

Functions without a return type may use `return;` to exit early.

```azin
fn validate(value: int) do
    if value < 0 do
        return;
    end

    print("Valid");
end
```

Returning a value from a function that does not declare a return type is invalid.

```azin
fn log(message: string) do
    return 42;
end
```

---

## Calling Functions

Functions that accept one or more parameters are always invoked using parentheses.

```azin
add(10, 20);
print("Hello");
```

Zero-parameter functions may be invoked either with or without parentheses.

```azin
version;
version();
```

Both forms are equivalent.

---

## Function References

Functions are first-class values.

Whenever a value of type `fn` is expected, the function name is interpreted as a function reference.

```azin
var callback: fn = version;
```

Functions may be passed as arguments.

```azin
fn execute(callback: fn) do
    ...
end

execute(version);
```

Functions may also be stored in variables.

```azin
var handler: fn = version;
```

No additional syntax is required to obtain a function reference.

In every other context, referencing a zero-parameter function automatically invokes it.

```azin
var text = version;

print(version);

version;
```

The examples above are equivalent to:

```azin
var text = version();

print(version());

version();
```

---

## Generic Functions

Generic functions declare one or more type parameters using square brackets.

```azin
fn identity[T](value: T): T do
    return value;
end
```

---

## Function Overloading

Multiple functions may share the same name provided that their parameter lists differ.

```azin
fn add(a: int, b: int): int do
    return a + b;
end

fn add(a: float, b: float): float do
    return a + b;
end
```

The compiler selects the appropriate overload based on the provided arguments.

---

## Examples

A simple function.

```azin
fn hello do
    print("Hello, World!");
end
```

A function with parameters.

```azin
fn power(base: int, exponent: int): int do
    ...
end
```

A function that returns a value.

```azin
fn max(a: int, b: int): int do
    if a > b do
        return a;
    end

    return b;
end
```

Passing a function as an argument.

```azin
fn run(callback: fn) do
    ...
end

run(version);
```

Storing a function reference.

```azin
var callback: fn = version;
```

---

## Design Goals

The function system is designed around a small set of principles.

* Simple, readable declarations.
* Minimal punctuation.
* Concise syntax for zero-parameter functions.
* Functions are first-class values.
* No dedicated syntax is required for function references.
* Function calls remain concise without sacrificing readability.
* Explicit declarations are preferred over implicit language magic.
