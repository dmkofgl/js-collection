# Date object

## 1) What `Date` is (interview answer)
`Date` represents a single point in time as a **timestamp**: the number of milliseconds since the Unix epoch:
- **Epoch**: `1970-01-01T00:00:00.000Z` (UTC)
- Internally, a `Date` stores a number (ms), not “a timezone-aware calendar object”.

```js
const now = new Date();
const ms = now.getTime(); // same as now.valueOf()
```

---

## 2) Creating dates
### 2.1 Current time
```js
const now = new Date();
```

### 2.2 From timestamp (ms)
```js
const d = new Date(0); // epoch
```

### 2.3 From components (local time)
`new Date(year, monthIndex, day, hours?, minutes?, seconds?, ms?)`
- `monthIndex` is **0-based** (`0 = January`, `11 = December`)

```js
const d = new Date(2026, 0, 9); // Jan 9, 2026 (local timezone)
```

### 2.4 From ISO string
ISO 8601 is the safest string format.

```js
const d1 = new Date("2026-01-09T10:00:00Z");      // explicit UTC
const d2 = new Date("2026-01-09T10:00:00+02:00"); // offset
```

---

## 3) UTC vs Local time (most important concept)
A `Date` is an absolute timestamp, but getters/setters come in two “modes”:
- **Local**: `getFullYear()`, `getMonth()`, `getDate()`, `getHours()`, ...
- **UTC**: `getUTCFullYear()`, `getUTCMonth()`, `getUTCDate()`, `getUTCHours()`, ...

Example:
```js
const d = new Date("2026-01-09T00:00:00Z");

// These differ depending on your local timezone
console.log(d.getHours());     // local hours
console.log(d.getUTCHours());  // 0
```

Interview phrasing:
- “Timezone is not stored inside `Date`. It’s applied when you format or read components in local time.”

---

## 4) Getting values (common methods)
### Timestamp
```js
Date.now();       // ms timestamp (number)
new Date().getTime();
```

### Day/time components
```js
const d = new Date();

d.getFullYear();  // local year
d.getMonth();     // 0..11
d.getDate();      // 1..31 (day of month)

d.getDay();       // 0..6 (day of week), 0 = Sunday

d.getHours();
d.getMinutes();
d.getSeconds();
d.getMilliseconds();
```

Common confusion:
- `getDate()` = day of month
- `getDay()` = day of week

---

## 5) Setting values
Mutating setters exist in local and UTC variants:
- `setFullYear`, `setMonth`, `setDate`, `setHours`, ...
- `setUTCFullYear`, `setUTCMonth`, ...

```js
const d = new Date(2026, 0, 9);

d.setDate(d.getDate() + 7); // add 7 days (local)
```

Note: setters handle overflow nicely:
```js
const d = new Date(2026, 0, 31);

d.setMonth(d.getMonth() + 1);
// moves into March depending on month length (can surprise)
```

---

## 6) Parsing: what’s safe and what’s not
### Safe
- ISO strings with timezone: `YYYY-MM-DDTHH:mm:ss.sssZ` or with `+02:00`

### Risky / implementation-dependent
- Non-ISO formats like `"01/02/2026"` (is it Jan 2 or Feb 1?)
- `Date.parse` on human formats

Also important:
- `new Date("2026-01-09")` (date-only) is treated as **UTC** by spec, which can display as previous day in some timezones when formatted locally.

---

## 7) Formatting
### Built-in (not great for production formatting)
```js
const d = new Date();

d.toString();        // local, human-ish
// Fri Jan 09 2026 ... GMT+...

d.toISOString();     // UTC ISO, great for APIs/logs
// 2026-01-09T...

d.toUTCString();
d.toDateString();
d.toTimeString();
```

### Recommended: `Intl.DateTimeFormat`
For locale-aware formatting (browser/Node).

```js
const fmt = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

fmt.format(new Date("2026-01-09T10:00:00Z"));
```

---

## 8) Comparing dates
Direct comparison works because `Date` converts to timestamp.

```js
const a = new Date("2026-01-01T00:00:00Z");
const b = new Date("2026-01-02T00:00:00Z");

console.log(a < b); // true
console.log(+a);    // timestamp number
```

Equality:
```js
new Date(0) === new Date(0); // false (different objects)
+new Date(0) === +new Date(0); // true (compare timestamps)
```

---

## 9) Common interview tasks
### 9.1 Difference in days
```js
function diffDays(a, b) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((+b - +a) / msPerDay);
}
```

DST caveat: if you care about “calendar days” in a timezone, raw ms division can be wrong around DST changes.

### 9.2 Add N days
```js
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
```

### 9.3 Measure execution time
```js
const start = Date.now();
// ...work...
const elapsedMs = Date.now() - start;
```
(Better: `performance.now()` for high-res in browsers/Node.)

---

## 10) Invalid dates
If parsing fails:
```js
const d = new Date("nope");
Number.isNaN(d.getTime()); // true
```

---

## 11) Big pitfalls / best practices
- Prefer storing and comparing **timestamps (ms)**, format only at the edges.
- Prefer **UTC** for APIs/logging (`toISOString`).
- Don’t rely on parsing of non-ISO date strings.
- Be careful with:
  - month index being 0-based
  - `getDay()` vs `getDate()`
  - DST and timezones when adding days/hours

---

## 12) “What about Temporal?” (modern mention)
`Date` has many legacy issues. The modern replacement is the **Temporal API** (at the time of writing, availability depends on platform).
Interview-safe statement:
- “For complex date/time logic, prefer a dedicated library or Temporal when available; use `Date` mainly for timestamps and basic formatting.”

---

## 13) Quick interview Q&A
- **Q:** What does `Date` store internally?
  - **A:** Milliseconds since Unix epoch (UTC-based timestamp).
- **Q:** Why is `new Date(2026, 0, 9)` January?
  - **A:** Month is 0-based.
- **Q:** How do you output a date for an API?
  - **A:** `date.toISOString()`.
- **Q:** How do you check if a date is valid?
  - **A:** `Number.isNaN(date.getTime())`.
- **Q:** Why can adding 24 hours differ from adding 1 day?
  - **A:** DST/timezone transitions; calendar vs duration difference.
