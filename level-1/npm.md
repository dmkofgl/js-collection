# NPM basics

## 1) What npm is (interview answer)
**npm** is:
- a **package registry** (npmjs.com)
- a **package manager** (`npm` CLI)

It manages:
- installing dependencies into `node_modules/`
- dependency metadata (`package.json`)
- reproducible installs (`package-lock.json`)
- running project commands (`npm run ...`)

---

## 2) `package.json` (core file)
`package.json` describes a Node/JS project.

Common fields:
- `name`, `version` (required for publishing)
- `private: true` (prevents accidental publish)
- `type: "module"` (enables ESM by default in Node)
- `main`, `exports` (entry points for packages)
- `scripts` (commands)
- `dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`
- `engines` (expected Node/npm versions)

---

## 3) Scripts
Run scripts from `package.json`:

```sh
npm run <script>
```

Examples (from this repo):
```sh
npm run demo:arrays
```

Notes:
- `npm test` is a shortcut for `npm run test`.
- `npm start` is a shortcut for `npm run start`.
- On Windows, npm handles PATH differences; avoid relying on bash-only syntax.

---

## 4) Installing packages
### Local install (most common)
Adds to `node_modules` and updates `package.json` + lockfile.

```sh
npm install lodash
npm i lodash
```

### Dev dependency
```sh
npm install -D eslint
npm i -D eslint
```

### Install exact versions
```sh
npm install react@18.2.0
```

### Global install (less common today)
```sh
npm install -g typescript
```

Modern guidance:
- prefer local installs + `npx` instead of global tools.

---

## 5) Removing / updating
```sh
npm uninstall lodash
npm update
```

Note: `npm update` respects semver ranges in `package.json`.

---

## 6) `npx` (run binaries without global install)
`npx` runs executables from:
- local `node_modules/.bin`
- or downloads a package temporarily

Examples:
```sh
npx eslint .
npx node@latest --version
```

Interview note:
- `npx` is great for one-off CLIs or running project tools.

---

## 7) Dependencies types (important)
### `dependencies`
- Needed at runtime in production.

### `devDependencies`
- Only for development/build/test (linters, bundlers, TS).

### `peerDependencies`
- Used by plugins/frameworks to require the host app to provide a dependency.
- Example: a React plugin usually has `react` as a peer dependency.

### `optionalDependencies`
- Install may fail without breaking the whole install (platform-specific deps).

---

## 8) SemVer & version ranges (interview favorite)
SemVer: `MAJOR.MINOR.PATCH`
- PATCH: bug fixes
- MINOR: new backward-compatible features
- MAJOR: breaking changes

Common ranges:
- `^1.2.3` → allow `1.x.x` updates (not `2.0.0`)
- `~1.2.3` → allow `1.2.x` updates (not `1.3.0`)
- `1.2.3` → exact

Important nuance:
- `^0.x.y` is more restrictive because 0.x versions are considered unstable by convention.

---

## 9) Lockfile: `package-lock.json`
`package-lock.json` pins the full dependency tree for reproducible installs.

- `npm install` updates lockfile as needed.
- `npm ci` installs **exactly** what’s in the lockfile (clean install) – best for CI.

```sh
npm ci
```

Interview point:
- Commit lockfiles for applications.
- For libraries, policies vary, but lockfiles are commonly not committed (team choice).

---

## 10) `node_modules` basics
- Contains installed packages.
- Often excluded from git.
- Can get large due to nested dependency trees.

If things break:
- delete `node_modules` + lockfile, reinstall (`npm install`) (use carefully)

---

## 11) Publishing basics (high-level)
Publishing is for packages (libraries) to npm registry.

Typical requirements:
- `name` and `version`
- not `private: true`

Commands:
```sh
npm login
npm publish
npm version patch|minor|major
```

---

## 12) npm config & registries (quick)
- You can configure npm via `.npmrc` (project/user level).
- Common settings: registry URL, auth tokens, proxy.

---

## 13) Security & hygiene
- `npm audit` checks known vulnerabilities.

```sh
npm audit
npm audit fix
```

- Avoid running random `postinstall` scripts from untrusted packages.
- Prefer well-maintained packages; keep dependencies up to date.

---

## 14) Common pitfalls (interview gotchas)
- Confusing `dependencies` vs `devDependencies`.
- Not committing `package-lock.json` in apps → non-reproducible installs.
- Using `npm install` in CI instead of `npm ci`.
- Relying on `^` ranges without understanding what updates you’ll get.
- Mixing package managers (`npm` + `yarn` + `pnpm`) in one repo.

---

## 15) Quick interview Q&A
- **Q:** What is `package.json`?
  - **A:** Project manifest: metadata, deps, scripts.
- **Q:** What is `package-lock.json` for?
  - **A:** Reproducible installs; pins dependency tree.
- **Q:** Difference between `npm install` and `npm ci`?
  - **A:** `npm ci` is clean, fast, and installs exactly from lockfile.
- **Q:** What does `^1.2.3` mean?
  - **A:** Allow compatible updates within major version 1.
- **Q:** When use `npx`?
  - **A:** Run package binaries without global install.
