# Best practices (naming conventions, variable declarations, modules, etc.)

## 1) What interviewers check
They usually want to see that you:
- write readable, maintainable code
- understand scoping, immutability, and side effects
- handle async + errors correctly
- avoid security/performance footguns

---

## 2) Naming conventions
### 2.1 Variables and functions
- Use **descriptive** names: `user`, `users`, `isLoading`, `getUserById`.
- Prefer **verbs** for functions: `fetchUsers`, `calculateTotal`.
- Prefer **booleans** starting with `is/has/can/should`.

```js
const isAdmin = user.role === "admin";
function getUserById(id) {}
```

### 2.2 Classes and constructors
- `PascalCase`: `UserService`, `HttpClient`.

### 2.3 Constants
- `UPPER_SNAKE_CASE` only for truly global constants.
- Otherwise use `camelCase` even for `const`.

```js
const API_TIMEOUT_MS = 5000;
const baseUrl = "https://api.example.com";
```

### 2.4 Avoid misleading names
Bad: `data`, `obj`, `temp` (unless very small scope).

---

## 3) Variable declarations: `const` / `let` / `var`
### 3.1 Prefer `const` by default
- `const` prevents reassignment, not mutation.

```js
const user = { name: "Anna" };
user.name = "Kate"; // ok
// user = {} // error
```

### 3.2 Use `let` when reassignment is required
```js
let total = 0;
for (const x of arr) total += x;
```

### 3.3 Avoid `var`
Reasons:
- function-scoped (not block-scoped)
- hoisting + confusing behavior

---

## 4) Scope and side effects
- Keep variables in the **smallest scope**.
- Avoid hidden side effects inside “getter-like” functions.

Bad:
```js
let cache;
function getData() {
  cache = compute(); // side effect
  return cache;
}
```

Better:
```js
function computeData() {
  return compute();
}
```

---

## 5) Immutability & data handling
### 5.1 Prefer immutable updates
Especially in UI/state management.

```js
const next = { ...prev, count: prev.count + 1 };
const nextArr = [...arr, newItem];
```

### 5.2 Don’t mutate inputs unless clearly documented
If you must mutate (performance), make it explicit.

---

## 6) Equality and type safety
- Prefer `===` / `!==`.
- Understand truthiness; don’t rely on it blindly.

```js
if (value == null) {
  // matches null or undefined
}
```

Avoid:
```js
if (value == 0) {} // can match "0" etc.
```

---

## 7) Functions best practices
### 7.1 Keep functions small and single-purpose
- If a function does 3 things, split it.

### 7.2 Prefer pure functions where possible
- same inputs → same output, no side effects.

### 7.3 Default params and destructuring for options
```js
function createUser({ name, role = "user" } = {}) {}
```

### 7.4 Avoid “callback hell”
- Prefer Promises / async/await.

---

## 8) Control flow
- Prefer early returns to reduce nesting.

Bad:
```js
function f(x) {
  if (x) {
    if (x > 10) {
      return x;
    }
  }
}
```

Better:
```js
function f(x) {
  if (!x) return;
  if (x <= 10) return;
  return x;
}
```

---

## 9) Error handling
- Throw `Error` objects (not strings).
- Catch only when you can recover; otherwise rethrow.
- Add context with `Error({ cause })` if supported.

```js
try {
  doWork();
} catch (err) {
  throw new Error("Work failed", { cause: err });
}
```

---

## 10) Async best practices
### 10.1 Prefer `async/await` for readability
```js
const res = await fetch(url);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
```

### 10.2 Always handle rejections
- `.catch(...)` or `try/catch` around `await`.

### 10.3 Parallelize independent work
```js
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

### 10.4 Use `AbortController` for cancellation (fetch)
Avoid “zombie requests” in UI.

---

## 11) Modules (ESM) best practices
### 11.1 Prefer ES Modules
- `import` / `export`
- keep modules small and cohesive

### 11.2 Avoid circular dependencies
They cause partial initialization bugs.

### 11.3 Exports
- Prefer named exports for libraries (`export function ...`).
- Default exports are fine but can reduce refactoring safety.

### 11.4 Keep boundaries clean
- UI, domain, infra separated.
- Don’t import from deep internal paths unless intended.

---

## 12) Code style and consistency
- Use a formatter (Prettier) + linter (ESLint).
- Keep consistent quotes, semicolons, etc.
- Prefer explicitness over cleverness.

Team rule: consistency beats personal preference.

---

## 13) Performance basics
- Don’t micro-optimize early; measure first.
- Avoid blocking the main thread with heavy loops.
- Beware memory leaks: intervals, event listeners, closures over large objects.

---

## 14) Security basics
- Never trust input (validate).
- Avoid `eval`.
- Don’t store secrets in `localStorage`.
- Use HTTPS; set secure cookie flags (`HttpOnly`, `Secure`, `SameSite`).
- Beware XSS when rendering untrusted HTML.

---

## 15) “Clean code” interview checklist
- Is naming clear?
- Is every function responsible for one thing?
- Are edge cases handled (`null/undefined`, empty arrays)?
- Is error handling explicit?
- Are async flows awaited/returned properly?
- Is the code testable?

---

## 16) Quick interview Q&A
- **Q:** Why prefer `const`?
  - **A:** Prevents reassignment and makes code easier to reason about.
- **Q:** Why avoid `var`?
  - **A:** Function scope + hoisting lead to surprising bugs.
- **Q:** `===` vs `==`?
  - **A:** `===` is strict and avoids implicit coercion.
- **Q:** How do you structure modules?
  - **A:** Small cohesive modules, clear boundaries, avoid circular deps.
- **Q:** How do you handle async errors?
  - **A:** `try/catch` around `await`, `.catch` in chains, don’t swallow errors.
