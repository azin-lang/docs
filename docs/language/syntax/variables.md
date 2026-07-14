# Variables

Variables store values that can be used throughout a program.

---

## Declaring Variables

Variables are declared using the `var` keyword.

```azin
var number = 42

var name = "Azin"

var enabled = true
```

Variables are **immutable by default**. To allow reassignment, use the `mut` modifier.

```azin
var mut counter = 0

counter = counter + 1
```

A variable declaration consists of:

- the `var` keyword,
- an optional `mut` modifier,
- the variable name,
- an optional type annotation,
- an initializer.

Every variable declaration must provide an initializer.

---

## Type Inference

When an initializer is present, the compiler automatically infers the variable's type.

```azin
var count = 10

var message = "Hello"

var letter = 'A'

var value = 3.14
```

The examples above are inferred as:

```text
count   -> int
message -> string
letter  -> char
value   -> float
```

Type inference is performed entirely at compile time.

---

## Explicit Types

A variable's type may be specified explicitly using `:`.

```azin
var score: int = 100

var name: string = "Alex"

var pi: float = 3.14
```

Explicit type annotations are optional whenever the type can be inferred.

---

## Mutability

Variables declared with `var` cannot be modified after initialization.

```azin
var value = 10

value = 20 // Error
```

To allow reassignment, declare the variable with `var mut`.

```azin
var mut value = 10

value = 20
```

Mutability is explicit to make accidental modification less likely.

---

## Assignment

Only mutable variables may be assigned new values.

```azin
var mut x = 5

x = 10
```

Assignments must be compatible with the variable's type.

```azin
var mut value: float = 10.0

value = 15.5
```

Assigning a value of an incompatible type results in a compile-time error.

---

## Variable Scope

Variables are visible only within the scope in which they are declared.

```azin
importc "stdio"

fn main: int do
    if true then
        var message = "Hello"

        printf("%s\n", message)
    end

    return 0
end
```

Variables declared inside a block are not accessible outside that block.

Inner scopes may shadow variables declared in outer scopes.

```azin
importc "stdio"

var value = 10

fn main: int do
    var value = 20

    printf("%d\n", value)

    return 0
end
```

---

## Global Variables

Variables may be declared outside of functions.

```azin
importc "stdio"

var version = "0.2.0"

fn main: int do
    printf("%s\n", version)

    return 0
end
```

Global variables are accessible throughout the program.

---

## Examples

A variable with an inferred type.

```azin
var age = 13
```

A mutable variable.

```azin
var mut count = 0

count = count + 1
```

A variable with an explicit type.

```azin
var name: string = "Azin"
```

A global variable.

```azin
importc "stdio"

var version = "0.2.0"

fn main: int do
    printf("%s\n", version)

    return 0
end
```
