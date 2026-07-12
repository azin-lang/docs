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

A variable declaration consists of:

* the `var` keyword,
* the variable name,
* an optional type annotation,
* an initializer.

Every variable declaration must provide either an explicit type or an initializer.

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

Type inference is performed at compile time.

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

## Initialization

Variables are initialized when they are declared.

```azin
var x = 12

var y: int = 42
```

A declaration without both a type and an initializer is invalid.

```azin
var value
```

The compiler cannot infer a type when no initializer is provided.

---

## Assignment

Variables may be reassigned after they are declared.

```azin
var x = 5

x = 10
```

Assignments must be compatible with the variable's declared or inferred type.

```azin
var value: float = 10
```

In Azin 0.1.x, implicit conversions follow the behavior of the generated C code.

---

## Variable Scope

Variables are visible only within the scope in which they are declared.

```azin
fn main do
    if true do
        var message = "Hello"
        print(message)
    end
end
```

Variables declared inside a block are not accessible outside that block.

Inner scopes may shadow variables declared in outer scopes.

```azin
var value = 10

fn main do
    var value = 20

    print(value)
end
```

---

## Global Variables

Variables may be declared outside of functions.

```azin
var version = "0.1.0"

fn main do
    print(version)
end
```

Global variables are accessible throughout the program.

---

## Upcoming Changes (0.2.0)

The following improvements are planned for Azin 0.2.0.

* Variables will be immutable by default.
* Mutable variables will be declared using `var mut`.
* Variables may be declared without an initializer provided an explicit type is specified.
* Compound assignment operators (`+=`, `-=`, `*=`, `/=`) will be supported.
* Increment and decrement operators (`++` and `--`) will be supported.
* Type checking will become stricter and will no longer rely on implicit C conversions.

---

## Examples

A variable with inferred type.

```azin
var age = 13
```

A variable with an explicit type.

```azin
var name: string = "Azin"
```

A global variable.

```azin
var version = "0.1.0"

fn main do
    print(version)
end
```

Reassigning a variable.

```azin
var count = 0

count = 1
```

---

## Design Goals

The variable system is designed around a small set of principles.

* Simple and readable declarations.
* Type inference whenever possible.
* Explicit types when desired.
* Minimal syntax.
* Predictable scoping rules.
* Stronger type safety planned for future releases.
