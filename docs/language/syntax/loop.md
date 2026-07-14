# Loops

Loops repeatedly execute a block of code.

Azin currently provides the `loop` statement, which creates an infinite loop. Execution continues until the loop is terminated with `stop` or the function returns.

---

## Basic Loop

A `loop` executes its body indefinitely.

```azin
loop
    printf("Hello!\n")
end
```

Since the loop has no exit condition, it will run forever unless it is terminated.

---

## Stopping a Loop

The `stop` statement immediately exits the nearest enclosing loop.

```azin
importc "stdio"

fn main: int do
    var mut i = 0

    loop
        printf("%d\n", i)

        if i == 10 then
            stop
        end

        i = i + 1
    end

    return 0
end
```

Once `i` reaches `10`, execution continues with the first statement after the loop.

---

## Nested Loops

`stop` only exits the innermost loop in which it appears.

```azin
loop
    loop
        stop
    end

    printf("Outer loop\n")
end
```

The inner loop terminates, while the outer loop continues executing.

---

## Returning from a Loop

Returning from a function also exits any active loops.

```azin
importc "stdio"

fn main: int do
    var mut value = 0

    loop
        if value == 5 then
            return 0
        end

        value = value + 1
    end
end
```

---

## Scope

Variables declared inside a loop are scoped to a single iteration.

```azin
loop
    var message = "Hello"

    printf("%s\n", message)
end
```

The variable `message` cannot be accessed outside the loop body.

---

## Examples

Counting from 0 to 10.

```azin
importc "stdio"

fn main: int do
    var mut i = 0

    loop
        printf("%d\n", i)

        if i == 10 then
            stop
        end

        i = i + 1
    end

    return 0
end
```

An infinite loop.

```azin
loop
    printf("Running...\n")
end
```

---

## Future Additions

Future releases may introduce additional looping constructs, including:

- Conditional loops.
- Range-based loops.
- Iterator-based loops.

The `loop` statement will remain the simplest way to express an infinite loop.

---

## Design Goals

The loop system is designed around a small set of principles.

- Simple syntax.
- Explicit termination with `stop`.
- Predictable control flow.
- Readable nested loops.
- Easy expansion with additional loop constructs in future releases.