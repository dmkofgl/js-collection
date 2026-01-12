# Promises

## 1) What a Promise is (interview answer)
A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation.

A Promise has 3 states:
- **pending** → initial
- **fulfilled** → resolved successfully (has a *value*)
- **rejected** → failed (has a *reason*, usually an `Error`)

A promise becomes *settled* once it’s fulfilled or rejected.

---

## 2) Creating Promises
### 2.1 Using `new Promise((resolve, reject) => ...)`
```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("ok"), 100);
});
```

Rules:
- `resolve(value)` fulfills.
- `reject(reason)` rejects.
- Only the **first call wins** (later resolve/reject calls are ignored).

### 2.2 Converting values to promises
```js
Promise.resolve(123);          // fulfilled promise
Promise.reject(new Error());   // rejected promise
```

---

## 3) Consuming Promises
### 3.1 `.then(onFulfilled, onRejected?)`
```js
p.then(value => {
  console.log(value);
});
```

### 3.2 `.catch(onRejected)`
```js
p.catch(err => {
  console.error(err);
});
```

### 3.3 `.finally(onFinally)`
Runs on both success and failure. Doesn’t receive the value/error.

```js
p.finally(() => {
  console.log("cleanup");
});
```

---

## 4) Chaining (the most important Promise concept)
`.then/.catch/.finally` return a **new Promise**.

Key rules interviewers expect:
1. If you **return a value**, the next `.then` receives it.
2. If you **return a Promise**, the chain waits for it.
3. If you **throw**, the chain becomes rejected.

```js
Promise.resolve(1)
  .then(x => x + 1)                 // returns value
  .then(x => Promise.resolve(x+1))  // returns promise
  .then(x => { throw new Error("boom"); })
  .catch(err => {
    console.log("caught", err.message);
    return 0;                       // recovery
  })
  .then(x => console.log("after", x));
```

### Common pitfall: forgetting to return
```js
fetch("/api")
  .then(res => res.json())
  .then(data => {
    doSomethingAsync(data); // <-- if this returns a promise but you don't return it,
    // the chain won't wait
  })
  .then(() => console.log("runs too early"));
```
Correct:
```js
fetch("/api")
  .then(res => res.json())
  .then(data => {
    return doSomethingAsync(data);
  })
  .then(() => console.log("runs after doSomethingAsync"));
```

---

## 5) Error handling
### 5.1 Errors thrown in `.then` are caught in `.catch`
```js
Promise.resolve()
  .then(() => {
    throw new Error("fail");
  })
  .catch(err => console.error(err.message));
```

### 5.2 Re-throw to propagate
```js
p.catch(err => {
  // add log/context
  throw err; // still rejected
});
```

### 5.3 Convert unknown thrown values to Error (best practice)
```js
function toError(e) {
  return e instanceof Error ? e : new Error(String(e));
}

p.catch(e => {
  const err = toError(e);
  console.error(err.message);
});
```

### 5.4 Unhandled rejections
If a promise rejects and nobody handles it, runtimes may warn or crash (Node can be configured).
In browsers you can listen to:
- `unhandledrejection`

---

## 6) Promise combinators (know these for interviews)
### 6.1 `Promise.all(iterable)`
- Resolves when **all** are fulfilled
- Rejects fast when **any** rejects

```js
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

Good for parallel independent operations.

### 6.2 `Promise.allSettled(iterable)`
- Resolves when all are settled
- Returns `{ status: "fulfilled", value }` or `{ status: "rejected", reason }`

```js
const results = await Promise.allSettled([fetchA(), fetchB()]);
```

### 6.3 `Promise.race(iterable)`
- Settles as soon as the **first** promise settles (fulfill or reject)

Common use: timeout.

```js
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}
```

### 6.4 `Promise.any(iterable)`
- Resolves on the **first fulfilled** promise
- Rejects only if **all reject** (with `AggregateError`)

```js
const fastestOk = await Promise.any([cdn1(), cdn2(), cdn3()]);
```

---

## 7) Promises and the Event Loop (microtasks)
Promise callbacks (`then/catch/finally`) run as **microtasks**.
- Microtasks run after the current synchronous code
- And typically before timer callbacks (`setTimeout`) which are macrotasks

```js
console.log("A");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("microtask"));
console.log("B");
// A, B, microtask, timeout
```

---

## 8) `async/await` is syntax over Promises
- `async function` always returns a Promise.
- `return x` becomes `Promise.resolve(x)`.
- `throw e` becomes `Promise.reject(e)`.

```js
async function f() {
  return 1;
}

f().then(console.log); // 1
```

Error handling equivalence:
```js
async function load() {
  try {
    const res = await fetch("/api");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    // handle or rethrow
    throw e;
  }
}
```

---

## 9) Sequential vs parallel awaits (common performance interview)
### Sequential (slower)
```js
const a = await fetchA();
const b = await fetchB();
```

### Parallel (faster)
```js
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

Rule of thumb: use `Promise.all` when tasks are independent.

---

## 10) Common pitfalls
- Forgetting to return a promise in `.then` (chain doesn’t wait).
- Swallowing errors in `.catch` (no rethrow) when you shouldn’t.
- Using `Promise.all` when you actually need partial results → use `allSettled`.
- Assuming `fetch` rejects on HTTP 404/500 (it doesn’t).
- Creating `new Promise` when you can use `async` / existing promise APIs.

---

## 11) Quick interview Q&A
- **Q:** What states can a Promise have?
  - **A:** pending, fulfilled, rejected.
- **Q:** What does `.then` return?
  - **A:** A new Promise.
- **Q:** How do errors propagate in chains?
  - **A:** Throwing inside `.then` or rejecting a returned promise makes the chain rejected until a `.catch` handles it.
- **Q:** Difference between `Promise.all` and `Promise.allSettled`?
  - **A:** `all` fails fast on first rejection; `allSettled` gives outcomes for all.
- **Q:** When do `.then` callbacks run?
  - **A:** As microtasks (after current stack, before timers).
