# Cookies

## 1) What cookies are (interview answer)
A **cookie** is a small `name=value` piece of data stored by the browser **per domain**.
- The browser automatically sends matching cookies to the server in the `Cookie` request header.
- Servers set cookies using the `Set-Cookie` response header.
- Primary uses: **sessions/auth**, personalization, tracking.

Cookies are constrained:
- Small size (commonly ~4KB per cookie)
- Limited count per domain (browser-dependent)

---

## 2) Request/response flow
### Server sets a cookie
Response header:
```
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure; SameSite=Lax
```

### Browser sends it back
Request header:
```
Cookie: sessionId=abc123
```

Interview phrasing:
- “Cookies are automatically attached to HTTP requests when rules (domain/path/samesite/secure) match.”

---

## 3) Core cookie attributes (must know)
Cookies are configured by attributes after `name=value`.

### `Domain`
- Controls which hosts receive the cookie.
- If omitted, cookie is **host-only** (only exact host).
- If set to a parent domain (e.g. `Domain=example.com`), subdomains may receive it.

### `Path`
- URL path prefix that must match.
- Common default: `Path=/`.

### `Expires` and `Max-Age`
Controls lifetime.
- **Session cookie**: no `Expires/Max-Age` → deleted when browser session ends.
- **Persistent cookie**: has `Expires=<date>` or `Max-Age=<seconds>`.

`Max-Age` usually takes precedence over `Expires`.

### `Secure`
- Cookie is sent **only over HTTPS**.

### `HttpOnly`
- Cookie is **not accessible** via `document.cookie`.
- Mitigates token theft via XSS.

### `SameSite`
Controls cross-site sending (important for CSRF).
- `Strict`: almost never sent cross-site.
- `Lax`: sent on top-level navigation GETs (common safe default).
- `None`: sent cross-site, but requires `Secure`.

---

## 4) Cookies from JavaScript (`document.cookie`)
### 4.1 Read
`document.cookie` returns a single string of all JS-accessible cookies:

```js
console.log(document.cookie);
// "theme=dark; locale=en"
```

### 4.2 Write
To set a cookie from JS, assign to `document.cookie`:

```js
document.cookie = "theme=dark; Path=/; Max-Age=86400; SameSite=Lax";
```

Notes:
- Writing doesn’t replace the whole string; it sets one cookie.
- You cannot set `HttpOnly` from JS (server-only).

### 4.3 Delete
Typically set `Max-Age=0` (and same `Path`/`Domain` as original).

```js
document.cookie = "theme=; Path=/; Max-Age=0";
```

---

## 5) Parsing `document.cookie` (common helper)
```js
function getCookie(name) {
  const pairs = document.cookie.split("; ");
  for (const pair of pairs) {
    const idx = pair.indexOf("=");
    const k = idx === -1 ? pair : pair.slice(0, idx);
    const v = idx === -1 ? "" : pair.slice(idx + 1);
    if (k === name) return decodeURIComponent(v);
  }
  return null;
}
```

When storing arbitrary values, use `encodeURIComponent` / `decodeURIComponent`.

---

## 6) Cookies vs `localStorage` / `sessionStorage`
### Cookies
- automatically sent to server
- small
- can be `HttpOnly` (secure for session ids)
- subject to `SameSite` / CSRF considerations

### localStorage
- not sent to server
- larger (~5–10MB)
- JS-accessible → XSS risk for secrets

### sessionStorage
- like localStorage but per tab/session

Interview-safe rule:
- **Auth sessions** → cookies (often `HttpOnly`, `Secure`, `SameSite=Lax/Strict`).
- **Non-sensitive client preferences** → localStorage.

---

## 7) Cookies and auth (sessions)
A common session pattern:
- server sets `Set-Cookie: sessionId=...; HttpOnly; Secure; SameSite=Lax`
- browser sends it automatically
- server looks up session state by sessionId

Why `HttpOnly`?
- prevents JS from reading session cookie in case of XSS.

---

## 8) CSRF basics (classic interview topic)
**CSRF** happens when a browser sends cookies automatically to a site, and a malicious site triggers a request.

Mitigations:
- `SameSite=Lax/Strict`
- CSRF tokens (double-submit or server-generated)
- checking `Origin` / `Referer` on state-changing requests

Key line:
- “CSRF is mainly a cookie-based auth problem because cookies are sent automatically.”

---

## 9) CORS note (often confused with cookies)
- **CORS** controls whether browser JS can read responses across origins.
- Cookies can be sent cross-origin only under specific conditions:
  - `SameSite=None; Secure`
  - `fetch` with `credentials: "include"` (and server must allow credentials)

---

## 10) Common pitfalls / gotchas
- Assuming cookies are “secure” without HTTPS.
- Forgetting `SameSite` impact on cross-site requests.
- Not setting `Path=/` → cookie not available on other routes.
- Trying to read `HttpOnly` cookies in JS (impossible by design).
- Storing sensitive tokens in `localStorage` (XSS risk).

---

## 11) Quick interview Q&A
- **Q:** How does a server set a cookie?
  - **A:** With the `Set-Cookie` response header.
- **Q:** How does a browser send cookies?
  - **A:** Automatically via the `Cookie` request header for matching domain/path and allowed by flags.
- **Q:** What does `HttpOnly` do?
  - **A:** Blocks access from JS (`document.cookie`), reducing XSS theft risk.
- **Q:** What does `SameSite` protect against?
  - **A:** Helps mitigate CSRF by limiting cross-site cookie sending.
- **Q:** How do you delete a cookie?
  - **A:** Set the same cookie with `Max-Age=0` (and same path/domain) or an expired `Expires`.
