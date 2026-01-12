# LocalStorage

## 1) What it is (interview answer)
`localStorage` is a browser **key–value** storage provided by the **Web Storage API**.
- Scope: **per origin** (protocol + domain + port)
- Persistence: survives page reloads and browser restarts (until explicitly cleared)
- Values: **strings only**
- API: synchronous

Use case: store small pieces of non-sensitive UI state (theme, language, feature flags).

---

## 2) Basic API
Available on `window.localStorage`.

### Write
```js
localStorage.setItem("theme", "dark");
```

### Read
```js
const theme = localStorage.getItem("theme");
// returns string or null
```

### Remove one key
```js
localStorage.removeItem("theme");
```

### Clear all keys for the origin
```js
localStorage.clear();
```

### Metadata
```js
localStorage.length;
localStorage.key(0); // key name by index
```

---

## 3) Strings only → JSON serialize/deserialize pattern
Since values are strings, store objects via JSON.

```js
const user = { id: 1, name: "Anna" };
localStorage.setItem("user", JSON.stringify(user));

const raw = localStorage.getItem("user");
const parsed = raw ? JSON.parse(raw) : null;
```

Best practice: always handle `null` + parse errors.

```js
function safeJsonParse(value) {
  if (value == null) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
```

---

## 4) Common limits & constraints
- Storage quotas are browser-dependent (often around **5–10 MB** per origin).
- Synchronous API: heavy reads/writes can block the main thread.
- Not available in some contexts (e.g., certain privacy modes, blocked third-party contexts) → can throw.

Interview point: wrap calls in `try/catch` if you care about robustness.

```js
try {
  localStorage.setItem("k", "v");
} catch (e) {
  // QuotaExceededError or storage disabled
}
```

---

## 5) `storage` event (multi-tab sync)
When `localStorage` changes in **one tab**, other tabs of the same origin receive a `storage` event.

```js
window.addEventListener("storage", (e) => {
  // e.key, e.oldValue, e.newValue, e.storageArea, e.url
  if (e.key === "theme") {
    applyTheme(e.newValue);
  }
});
```

Important nuance:
- The tab that performed `setItem` **does not** receive the event.

---

## 6) `localStorage` vs `sessionStorage` vs cookies
### `localStorage`
- persists until cleared
- per origin
- JS-accessible

### `sessionStorage`
- same API, but data lives per **tab/session**
- cleared when the tab is closed

### Cookies
- sent automatically to the server (for the cookie’s domain/path)
- much smaller (typically ~4KB)
- can be `HttpOnly` (not accessible from JS) → good for session cookies

Interview framing:
- “Use cookies for server auth/session. Use local/session storage for client-only state.”

---

## 7) Security notes (important)
- `localStorage` is accessible from JS → vulnerable to **XSS**.
- Don’t store secrets: access tokens, passwords, refresh tokens.
- Consider `HttpOnly` cookies for auth when possible.

Also:
- Any script on the same origin can read/modify localStorage.

---

## 8) Useful patterns
### 8.1 Namespacing keys
Avoid collisions (especially in larger apps):
```js
const KEY = "myapp:theme";
localStorage.setItem(KEY, "dark");
```

### 8.2 TTL / expiring values (manual)
`localStorage` has no built-in expiration.

```js
function setWithTtl(key, value, ttlMs) {
  const payload = { value, expiresAt: Date.now() + ttlMs };
  localStorage.setItem(key, JSON.stringify(payload));
}

function getWithTtl(key) {
  const payload = safeJsonParse(localStorage.getItem(key));
  if (!payload) return null;
  if (typeof payload.expiresAt !== "number" || Date.now() > payload.expiresAt) {
    localStorage.removeItem(key);
    return null;
  }
  return payload.value;
}
```

### 8.3 Safe wrapper (optional)
Hide JSON + error handling behind small helpers.

---

## 9) Common pitfalls (interview “gotchas”)
- Forgetting it stores **strings only**.
- Not handling `null` from `getItem`.
- `JSON.parse` throwing on malformed data.
- Exceeding quota (`QuotaExceededError`).
- Using localStorage for sensitive tokens (XSS risk).
- Assuming `storage` event fires in the same tab (it doesn’t).

---

## 10) Quick interview Q&A
- **Q:** What types can localStorage store?
  - **A:** Strings only (objects must be serialized).
- **Q:** Is localStorage synchronous?
  - **A:** Yes, it can block the main thread.
- **Q:** When does localStorage clear?
  - **A:** When user clears site data, app clears it, or browser policies remove it.
- **Q:** How to sync state between tabs?
  - **A:** Listen to `storage` events on `window`.
- **Q:** Should you store JWT in localStorage?
  - **A:** Usually no (XSS risk). Prefer HttpOnly cookies or other secure patterns.
