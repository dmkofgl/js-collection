# EventLoop basics

## 1) What it is (short definition)
The **event loop** is the mechanism that lets JavaScript run **non-blocking** code by:
1) executing synchronous code on the **call stack**, and
2) picking the next queued callback to run when the stack is empty.

JavaScript (in browsers and Node) is **single-threaded for JS execution**, but the runtime provides background capabilities (timers, I/O) and queues callbacks back to JS.

---

## 2) Core pieces (words interviewers expect)
### Call stack
- Where synchronous function calls execute.
- If you block the stack (heavy loop), nothing else can run (UI freezes, timers delay).

### Runtime / Web APIs / Node APIs
- Timers (`setTimeout`), DOM events, networking, filesystem (Node), etc.
- These are not “the JS engine”, they are **runtime** features.

### Queues
Two important kinds (browser terminology):
- **Macrotask queue** (a.k.a. “task queue”): `setTimeout`, `setInterval`, UI events, `postMessage`, etc.
- **Microtask queue**: Promise reactions (`.then/.catch/.finally`), `queueMicrotask`, `MutationObserver`.

Microtasks have **higher priority**: after each macrotask, the engine drains microtasks before moving on.

---

## 3) The canonical rule set (ordering)
A simplified, interview-usable model:
1. Run synchronous code until the call stack is empty.
2. Take **one macrotask** from the macrotask queue and execute its callback.
3. **Drain all microtasks** (run microtasks until the microtask queue is empty).
4. (Browser) Give the renderer a chance to **paint** between tasks.
5. Repeat.

Important consequence:
- A long chain of microtasks can **starve** rendering and delay timers.

---

## 4) “0 ms timeout” is not immediate
```js
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
// 1 3 2
```
Because `setTimeout` schedules a macrotask that can run only after current stack finishes.

---

## 5) Microtasks vs macrotasks (classic interview snippet)
```js
console.log("A");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("microtask"));
console.log("B");

// A
// B
// microtask
// timeout
```
Explanation:
- Synchronous logs first.
- Promise `.then` is a **microtask** and runs before timers.

### `queueMicrotask`
```js
queueMicrotask(() => console.log("micro"));
```
Used when you want to schedule work **after current sync code**, but **before** timers/render.

---

## 6) How `async/await` maps to the event loop
`await` is (conceptually) syntax sugar over Promises.
- Code **before** `await` runs synchronously.
- When you hit `await`, the function yields; the rest continues in a **microtask** once the awaited promise resolves.

```js
async function f() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}

console.log("A");
f();
console.log("B");
// A, 1, B, 2
```

---

## 7) Browser rendering notes (good to mention)
In browsers there’s also rendering:
- Between tasks, the browser may perform layout/paint.
- Long JS tasks (> 50ms) can cause jank.

Common tools/strategies:
- `requestAnimationFrame` (run before next paint)
- splitting work using `setTimeout(..., 0)` / `requestIdleCallback` (when available)

---

## 8) Node.js differences (keep it high-level)
Node has an event loop too, but its phases differ (timers, poll, check…).
Interview-safe points:
- `setImmediate` in Node schedules callbacks in a different phase than `setTimeout(0)`.
- Promise callbacks are still **microtasks**.

(If asked for details: mention `process.nextTick` is even “sooner” than Promises and can starve the loop if abused.)

---

## 9) Common pitfalls / gotchas
- **Blocking** the stack delays everything (timers, UI events, network callbacks).
- **Unhandled Promise rejections**: forgetting `.catch` / missing `try/catch` around `await`.
- Assuming timers run “exactly at N ms” (they’re minimum delays, affected by load and throttling).
- Microtask-heavy loops can freeze the UI:

```js
function starve() {
  Promise.resolve().then(starve);
}
starve(); // can prevent rendering/timers
```

---

## 10) Quick interview Q&A
- **Q:** Why is JS called single-threaded if the browser does many things at once?
  - **A:** JS execution is single-threaded, but the runtime uses other threads/processes for I/O/timers and queues callbacks back.
- **Q:** What’s the difference between microtasks and macrotasks?
  - **A:** Microtasks (Promises) are drained after each task and run before the next macrotask (timers/events).
- **Q:** Where does `setTimeout` callback run?
  - **A:** In the macrotask queue; it runs when the call stack is empty and the delay has passed.
- **Q:** Why can `setTimeout(fn, 1000)` run later than 1 second?
  - **A:** If the stack is busy, the callback waits; also throttling and minimum delay clamping.
- **Q:** How do you schedule work right after current synchronous code?
  - **A:** `queueMicrotask` or `Promise.resolve().then(...)` (microtask).

---

## 11) Mini “cheat diagram”
- **Sync code** → Call stack
- **Timer / DOM / I/O completes** → callback goes to **macrotask queue**
- **Promise resolves/rejects** → reactions go to **microtask queue**
- Event loop:
  - run 1 macrotask
  - drain microtasks
  - render (browser)
  - repeat
