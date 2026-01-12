# HTTP: GET/POST requests

## 1) What HTTP is (interview answer)
**HTTP** is an application-level protocol for **request → response** communication.
- Client (browser/mobile/server) sends a **request**.
- Server returns a **response**.
- HTTP is **stateless**: each request is independent (state is carried via cookies/tokens/etc.).

You’ll mostly interact with HTTP via `fetch`, `XMLHttpRequest` (legacy), or libraries like Axios.

---

## 2) Request anatomy
A request consists of:
- **Method**: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, ...
- **URL**: scheme + host + path + query string
- **Headers**: metadata (content type, auth, caching, etc.)
- **Body**: payload (usually for POST/PUT/PATCH)

Example URL:
```
https://api.example.com/users?limit=10&offset=0
```
- Query params are part of the URL (visible in logs/history, length-limited by clients/servers).

---

## 3) Response anatomy
A response consists of:
- **Status code** (e.g. `200`, `404`, `500`)
- **Headers**
- **Body** (HTML, JSON, text, binary, etc.)

---

## 4) GET vs POST (main interview core)
### 4.1 GET
Semantics:
- **Read** a resource (no intended server-side state change).
- Parameters typically go in the **query string**.

Properties:
- **Safe** (should not change server state).
- **Idempotent** (same request repeated → same result, *in principle*).
- **Cacheable** by default (depends on headers).
- Can be bookmarked/shared easily.

Typical usage:
- Fetch list/details: `/users`, `/users/123`.

### 4.2 POST
Semantics:
- **Submit data** to the server (often create resource or trigger processing).
- Data usually goes in the **request body**.

Properties:
- **Not idempotent** by default (repeating may create duplicates).
- Usually **not cacheable** (unless explicitly configured).

Typical usage:
- Create: `POST /users` with JSON body.
- Login: `POST /auth/login`.

### 4.3 “Idempotent” vs “Safe” (common interview trap)
- **Safe**: should not change server state (GET is safe).
- **Idempotent**: repeating the same request has the same effect (GET/PUT/DELETE are typically idempotent; POST is typically not).

---

## 5) Status codes (know the popular ones)
### 2xx success
- `200 OK` (generic success)
- `201 Created` (resource created; often with `Location` header)
- `204 No Content` (success, no body)

### 3xx redirect
- `301 Moved Permanently`
- `302 Found`
- `304 Not Modified` (cache revalidation)

### 4xx client errors
- `400 Bad Request` (invalid input)
- `401 Unauthorized` (missing/invalid auth)
- `403 Forbidden` (auth ok, but not allowed)
- `404 Not Found`
- `409 Conflict` (duplicate / version conflict)
- `422 Unprocessable Content` (validation error, common in APIs)
- `429 Too Many Requests` (rate limit)

### 5xx server errors
- `500 Internal Server Error`
- `502 Bad Gateway`
- `503 Service Unavailable`

---

## 6) Important headers & content types
### Request headers
- `Accept: application/json` — what client wants back
- `Content-Type: application/json` — what client sends (for bodies)
- `Authorization: Bearer <token>` — token auth
- `Cookie: ...` — cookie auth (browser sets it automatically)

### Response headers
- `Content-Type: application/json`
- `Set-Cookie: ...` — server sets cookies
- `Cache-Control: ...` — caching rules
- `ETag: ...` and `If-None-Match: ...` — cache validation

Common content types:
- `application/json`
- `text/plain`
- `text/html`
- `application/x-www-form-urlencoded` (classic HTML forms)
- `multipart/form-data` (file uploads)

---

## 7) GET request in JS (`fetch`)
### 7.1 Simple GET
```js
const res = await fetch("/api/users");
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const users = await res.json();
```

### 7.2 GET with query params
Use `URL` + `URLSearchParams` (safer than manual concatenation).

```js
const url = new URL("/api/users", window.location.origin);
url.searchParams.set("limit", "10");
url.searchParams.set("offset", "0");

const res = await fetch(url);
```

---

## 8) POST request in JS (`fetch`)
### 8.1 Send JSON
```js
const payload = { name: "Anna" };

const res = await fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  body: JSON.stringify(payload),
});

if (!res.ok) throw new Error(`HTTP ${res.status}`);
const created = await res.json();
```

Interview note: `fetch` doesn’t throw on `404/500`. You must check `res.ok`.

### 8.2 Form submit (urlencoded)
```js
const form = new URLSearchParams({ login: "a", password: "b" });

await fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: form,
});
```

### 8.3 File upload (multipart/form-data)
When using `FormData`, **don’t** set `Content-Type` manually (browser adds boundary).

```js
const fd = new FormData();
fd.append("file", fileInput.files[0]);
fd.append("title", "Profile photo");

await fetch("/api/upload", {
  method: "POST",
  body: fd,
});
```

---

## 9) Caching basics (GET focus)
Common interview points:
- GET can be cached (browser/proxy/server) based on headers.
- `Cache-Control: no-store` disables storage.
- `ETag` + `If-None-Match` can enable `304 Not Modified` responses.

---

## 10) Auth basics: cookies vs tokens
### Cookies
- Often used for session auth.
- Sent automatically by the browser for the domain.
- Need `SameSite`, `Secure`, `HttpOnly` flags.

### Bearer tokens
- Sent via `Authorization: Bearer ...`.
- Stored by client (be careful with XSS if stored in localStorage).

---

## 11) CORS (browser-only constraint)
**CORS** is a browser security mechanism that restricts cross-origin requests.
- Server must include headers like `Access-Control-Allow-Origin`.
- Non-simple requests trigger a **preflight** `OPTIONS` request.

Interview phrasing:
- “CORS is enforced by the browser, not by the server-to-server HTTP protocol.”

---

## 12) Abort / timeout pattern
`fetch` supports cancellation via `AbortController`.

```js
const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 5000);

try {
  const res = await fetch("/api/users", { signal: controller.signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
} finally {
  clearTimeout(id);
}
```

---

## 13) Common mistakes (good interview “gotchas”)
- Sending sensitive data in query string (logs/history/cache).
- Assuming POST is “more secure” by default (HTTPS is what secures transport).
- Forgetting `Content-Type` when sending JSON.
- Forgetting to check `res.ok`.
- Not handling network errors + retries/backoff.
- CORS confusion (client-side only).

---

## 14) Quick interview Q&A
- **Q:** Can GET have a body?
  - **A:** Some clients/servers allow it but it’s not standard practice; use query params.
- **Q:** Why is POST not idempotent?
  - **A:** Repeating it can create multiple resources / trigger repeated actions.
- **Q:** What’s the difference between 401 and 403?
  - **A:** 401 = not authenticated; 403 = authenticated but not authorized.
- **Q:** Why does `fetch` not throw on HTTP errors?
  - **A:** It only rejects on network-level failures; HTTP errors are valid responses.
