# Environment Variables

## 1) What environment variables are (interview answer)
**Environment variables** are key–value pairs provided to a running process by the OS/runtime.
They’re commonly used for **configuration**:
- API URLs
- database connection strings
- feature flags
- ports (`PORT`)
- environment mode (`NODE_ENV`)

Why env vars?
- separate config from code (12-factor app idea)
- same code can run in dev/stage/prod with different configuration

---

## 2) Environment variables in Node.js
### 2.1 Access: `process.env`
In Node, env vars are available via `process.env`.

```js
console.log(process.env.NODE_ENV);
console.log(process.env.PORT);
```

Important notes:
- Values are **strings** (or `undefined`).
- Changing `process.env.X` affects only the current process, not the OS.

### 2.2 Setting env vars when running Node
macOS/Linux (your shell is `zsh`):
```sh
NODE_ENV=production PORT=3000 node server.js
```

Cross-platform note:
- On Windows, syntax differs (`set VAR=value && ...`).
- Many projects use `cross-env` for portability.

---

## 3) `.env` files (local development)
A `.env` file is a convenient way to store env variables locally.
Typical format:
```env
NODE_ENV=development
PORT=3000
API_URL=https://api.example.com
```

Very important:
- `.env` often contains secrets → usually should be in `.gitignore`.
- Use `.env.example` to document required variables without secrets.

---

## 4) `dotenv` (common tooling)
Node does not automatically read `.env`. A popular approach is the `dotenv` package.

ESM style (since this repo uses `"type": "module"`):
```js
import "dotenv/config";

console.log(process.env.API_URL);
```

Or explicit:
```js
import dotenv from "dotenv";

dotenv.config();
```

Interview note:
- `dotenv` loads variables into `process.env` **at startup**.

---

## 5) Browser vs Node: big interview distinction
### Browser
There is **no real `process.env`** in the browser runtime.
When you see `process.env` in frontend apps, it’s usually:
- replaced at **build time** by a bundler (Vite/Webpack)
- or provided by a framework convention

Examples:
- **Vite**: `import.meta.env.VITE_API_URL`
- **Create React App (legacy)**: `process.env.REACT_APP_*`
- **Next.js**: server env vars vs `NEXT_PUBLIC_*` exposed to browser

Key security rule:
- Anything accessible in frontend code is **public**. Don’t put secrets there.

---

## 6) Validation & config patterns (good interview practice)
### 6.1 Fail fast on missing config
```js
function requireEnv(name) {
  const value = process.env[name];
  if (value === undefined || value === "") {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const dbUrl = requireEnv("DATABASE_URL");
```

### 6.2 Parse types (env vars are strings)
```js
const port = Number(process.env.PORT ?? 3000);
if (!Number.isFinite(port)) throw new Error("PORT must be a number");

const debug = process.env.DEBUG === "true";
```

---

## 7) Precedence (common convention)
Different systems may override each other. A common order is:
1. real environment variables (CI/prod)
2. `.env.local` or `.env` (dev)
3. code defaults

Exact precedence depends on your framework.

---

## 8) Common env vars you may be asked about
- `NODE_ENV` (commonly `development` / `production` / `test`)
- `PORT`
- `DATABASE_URL`
- `API_URL`
- `PATH` (OS-level)

Caveat:
- `NODE_ENV` is not set by Node automatically; many tools set it.

---

## 9) Security best practices
- Never commit real secrets (`.env`) to git.
- Rotate leaked credentials.
- Use secret managers in production (Vault, AWS Secrets Manager, GCP Secret Manager, etc.).
- Don’t expose secrets to the browser bundle.

---

## 10) Common pitfalls (interview “gotchas”)
- Assuming env vars are numbers/booleans (they’re strings).
- Using `.env` in production without a secure process.
- Logging secrets.
- Treating `NODE_ENV` as a security control (it’s a convention, not a security boundary).
- `process.env` in frontend code without understanding build-time replacement.

---

## 11) Quick interview Q&A
- **Q:** How do you read env variables in Node?
  - **A:** `process.env.MY_VAR`.
- **Q:** What type is `process.env.PORT`?
  - **A:** String (or `undefined`), so you must parse.
- **Q:** Should frontend apps store secrets in env vars?
  - **A:** No. Frontend env vars are bundled and visible to users.
- **Q:** What is `.env` used for?
  - **A:** Local/dev configuration loaded at startup (often via `dotenv`).
- **Q:** How do you handle missing env vars?
  - **A:** Validate at startup and fail fast with a clear error.
