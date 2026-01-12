# Timers: `setTimeout`, `setInterval`

## 1) What interviewers want to hear
- Timers schedule **callbacks** to run **later** (not “after exactly N ms”).
- They’re handled by the **event loop**: callback runs when the **call stack is empty** and the delay has passed.
- Real timing depends on: current JS work, browser tab throttling, Node event loop load, minimum delays.

---

## 2) `setTimeout(fn, delay, ...args)`
Schedules `fn` to run once.

```js
const id = setTimeout(() => {
  console.log("runs once");
}, 1000);

clearTimeout(id); // cancels if it hasn't executed yet
```

### Passing arguments
```js
setTimeout((name) => console.log(`Hi, ${name}`), 500, "Anna");
```

### `this` gotcha
If you pass a method reference, you may lose `this`.

```js
const obj = {
  x: 1,
  print() { console.log(this.x); }
};

setTimeout(obj.print, 0);              // undefined (or global), depends on strict mode
setTimeout(() => obj.print(), 0);      // 1
setTimeout(obj.print.bind(obj), 0);    // 1
```

---

## 3) `setInterval(fn, delay, ...args)`
Schedules `fn` repeatedly.

```js
const id = setInterval(() => {
  console.log("tick");
}, 1000);

clearInterval(id);
```

### Key drawback: drift / overlap risk
If callback takes longer than interval, executions can get delayed (and in some environments “pile up”).

```js
setInterval(() => {
  // heavy work can cause drift
  const start = Date.now();
  while (Date.now() - start < 1200) {}
  console.log("done");
}, 1000);
```

Interview-friendly guidance: prefer **recursive `setTimeout`** for polling.

---

## 4) Recursive `setTimeout` (better polling pattern)
- Schedules the next run **after the current run finishes**.
- Easier to implement backoff/retry.

```js
let stopped = false;

function poll() {
  if (stopped) return;

  doSomething();

  setTimeout(poll, 1000);
}

poll();

// later
stopped = true;
```

With async work:
```js
let timerId;

async function poll() {
  try {
    await fetch("/health");
  } finally {
    timerId = setTimeout(poll, 1000);
  }
}

poll();

// cancel future polls
clearTimeout(timerId);
```

---

## 5) “0 ms timeout” is not immediate
```js
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
// 1, 3, 2
```
Reason: callback goes to the **macrotask queue** and runs after current call stack.

Related interview point:
- Promise callbacks (`.then`, `await`) run as **microtasks** and typically execute **before** timers.

```js
console.log("A");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("microtask"));
console.log("B");
// A, B, microtask, timeout
```

---

## 6) Minimum delay & throttling (browser)
Browsers may clamp timer resolution:
- nested timeouts often get a **minimum delay** (e.g., ~4ms)
- inactive tabs can be **throttled** heavily

So timers are good for “run later”, not precise scheduling.

---

## 7) Cancelation patterns
### Debounce (common interview task)
Run after user stops triggering events.

```js
function debounce(fn, delay) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}
```

### Throttle (interval-like behavior)
Run at most once per interval.

```js
function throttle(fn, interval) {
  let last = 0;
  let trailingId;

  return (...args) => {
    const now = Date.now();
    const remaining = interval - (now - last);

    if (remaining <= 0) {
      last = now;
      fn(...args);
      return;
    }

    clearTimeout(trailingId);
    trailingId = setTimeout(() => {
      last = Date.now();
      fn(...args);
    }, remaining);
  };
}
```

---

## 8) Timer IDs: browser vs Node
- Browser: `setTimeout` returns a **number**.
- Node.js: returns a `Timeout` object (still works with `clearTimeout`).

In TS projects, types differ: `ReturnType<typeof setTimeout>` is the portable type.

---

## 9) Common pitfalls
- Forgetting to `clearTimeout/clearInterval` → leaks, duplicated requests, unexpected UI updates.
- Doing heavy sync work in callbacks → blocks the main thread.
- Assuming timers are precise.
- Relying on intervals for polling without considering drift.
- Losing `this` when passing methods.

---

## 10) Quick interview Q&A
- **Q:** Is `setTimeout(fn, 0)` the same as “run immediately”?
  - **A:** No. It runs after the current call stack and after microtasks.
- **Q:** How to stop an interval?
  - **A:** `const id = setInterval(...); clearInterval(id)`.
- **Q:** Why can a 1000ms interval run every 1300ms?
  - **A:** Event loop delays + callback duration + throttling/clamping.
- **Q:** Better pattern for polling: `setInterval` or recursive `setTimeout`?
  - **A:** Often recursive `setTimeout` to avoid overlap and control scheduling.

