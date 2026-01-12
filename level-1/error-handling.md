# Error Handling (try/catch)

## 1) The mental model (what interviewers check)
- **An error is just a thrown value** that *unwinds the call stack* until it’s handled.
- `try/catch` handles **synchronous** exceptions thrown inside the `try` block.
- **Async errors** (timers, Promises, event handlers) don’t automatically get caught by an outer `try/catch` unless you `await` (or handle via `.catch`).

Key question: *“Where does the error travel?”* → along the **current** call stack only.

---

## 2) `try / catch / finally`
### Syntax
```js
try {
  // risky code
} catch (err) {
  // handle (log, wrap, recover)
} finally {
  // always runs (even after return/throw)
}
```

### What `finally` is for
- Cleanup: close resources, stop spinners, release locks.
- Runs after `return` too.

```js
function read() {
  try {
    return "ok";
  } finally {
    // still runs
    console.log("cleanup");
  }
}
```

### Catch binding
- `catch (err)` gives you the thrown value.
- In modern JS you can omit it: `catch { ... }`.

---

## 3) `throw`: what to throw
You *can* throw anything (`throw "oops"`, `throw 123`), but best practice is to throw an **Error object**.

```js
throw new Error("Invalid user input");
```

Why `Error`?
- Has `name`, `message`, and importantly `stack` (debugging).

---

## 4) Built-in error types worth knowing
Common ones:
- `Error` – base
- `TypeError` – wrong type / calling non-function / invalid operations
- `ReferenceError` – variable not defined
- `SyntaxError` – parse errors (usually not catchable at runtime in the same script)
- `RangeError` – invalid range (e.g., array length)
- `URIError` – malformed URI sequences
- `AggregateError` – multiple errors (common with `Promise.any`)

Browser-specific you may see:
- `DOMException` – many Web APIs (e.g., `localStorage`, `crypto`, DOM)

---

## 5) Rethrow vs handle
### Recover (handle and continue)
```js
try {
  JSON.parse("not-json");
} catch (err) {
  console.warn("Bad JSON, using defaults", err);
}
```

### Rethrow (don’t swallow)
Swallowing errors makes debugging hard. If you can’t recover, rethrow.

```js
try {
  doWork();
} catch (err) {
  // add context, then rethrow
  throw err;
}
```

### Wrap with more context (recommended)
Use `cause` (supported in modern Node + browsers).

```js
try {
  doWork();
} catch (err) {
  throw new Error("Failed to doWork() in checkout flow", { cause: err });
}
```

---

## 6) Custom errors (interview favorite)
Create semantic error types so callers can react differently.

```js
class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}

function parseAge(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) {
    throw new ValidationError("Age must be a non-negative number", { value });
  }
  return n;
}

try {
  parseAge("-");
} catch (err) {
  if (err instanceof ValidationError) {
    // show user-friendly message
  } else {
    // unknown -> rethrow or report
    throw err;
  }
}
```

Notes:
- Prefer `instanceof` checks for your own error classes.
- In multi-realm cases (iframes) `instanceof` can be tricky; checking `name` can be a fallback.

---

## 7) Async error handling
### 7.1 Promises: `.catch` and chain behavior
```js
fetch("/api")
  .then(r => r.json())
  .then(data => use(data))
  .catch(err => {
    // catches: network errors OR errors thrown in any previous then
    console.error(err);
  });
```

Important:
- Throwing inside `.then` turns into a **rejection**.
- Returning a rejected promise is the same as throwing.

### 7.2 `async/await` + try/catch
```js
async function load() {
  try {
    const r = await fetch("/api");
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } catch (err) {
    // handle or wrap
    throw new Error("load() failed", { cause: err });
  }
}
```

### 7.3 Why outer `try/catch` doesn’t catch timer errors
```js
try {
  setTimeout(() => {
    throw new Error("boom");
  }, 0);
} catch (err) {
  // won't run
}
```
Reason: callback runs later on a different tick; the original stack is gone.

---

## 8) Handling “expected failures” vs “programmer bugs”
Useful interview framing:
- **Expected/operational errors**: network failure, validation, timeouts → handle gracefully.
- **Programmer bugs**: `TypeError` due to null access → should be fixed, not hidden.

Rule of thumb: only catch what you can meaningfully handle.

---

## 9) Global/unhandled errors (browser + Node)
### Browser
- `window.addEventListener("error", ...)` for uncaught exceptions
- `window.addEventListener("unhandledrejection", ...)` for unhandled Promise rejections

### Node.js
- `process.on("uncaughtException", ...)` (last resort)
- `process.on("unhandledRejection", ...)`

Interview note: these are for logging/telemetry and graceful shutdown, **not** normal control flow.

---

## 10) HTTP errors aren’t thrown automatically
Common interview pitfall:
- `fetch()` only rejects on network errors.
- 404/500 are **successful fetch** with `ok === false`.

```js
const res = await fetch("/missing");
if (!res.ok) throw new Error(`HTTP ${res.status}`);
```

---

## 11) Patterns you can mention
### Guard clauses (avoid try/catch when possible)
```js
function getUser(user) {
  if (!user) return null;
  return user.name ?? null;
}
```

### Convert unknown thrown values to Error
```js
function toError(e) {
  return e instanceof Error ? e : new Error(String(e));
}

try {
  risky();
} catch (e) {
  const err = toError(e);
  console.error(err.message, err.stack);
}
```

### Don’t use exceptions for normal branching
Prefer returning `null`, `undefined`, `Result` objects, etc., for expected cases.

---

## 12) Quick interview Q&A
- **Q:** Does `try/catch` catch syntax errors?
  - **A:** Parse-time syntax errors prevent code from running; runtime `try/catch` won’t help for the same script.
- **Q:** What does `finally` do?
  - **A:** Runs regardless of `throw`/`return` — good for cleanup.
- **Q:** How do you catch errors from an async function?
  - **A:** `await` inside `try/catch` or use `promise.catch(...)`.
- **Q:** Difference between throwing in `async` function vs returning rejected promise?
  - **A:** Equivalent: `throw` becomes a rejection.
- **Q:** When should you rethrow?
  - **A:** When you can’t recover; add context and rethrow.

---

## 13) Best practices checklist
- Use `Error` (or subclasses), not strings.
- Add **context** when rethrowing; use `Error({ cause })` when possible.
- Don’t swallow errors silently.
- Catch only what you can handle.
- Always handle Promise rejections.
- Log with stack traces in dev; sanitize sensitive data in prod.
