/**
 * Array methods demo (mutating vs non-mutating)
 *
 * Run:
 *   node array-methods-demo.mjs
 */

const divider = () => console.log("-".repeat(80));

function formatValue(value) {
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (value && typeof value === "object") {
    // Maps/Sets to something readable
    if (value instanceof Map) {
      return `Map(${JSON.stringify([...value.entries()])})`;
    }
    if (value instanceof Set) {
      return `Set(${JSON.stringify([...value.values()])})`;
    }
    return JSON.stringify(value);
  }
  return String(value);
}

function section(title) {
  divider();
  console.log(title);
  divider();
}

function demo(methodName, createInput, run) {
  const input = createInput();
  const before = Array.isArray(input) ? [...input] : input;

  const result = run(input);

  const mutated = Array.isArray(input)
      ? JSON.stringify(input) !== JSON.stringify(before)
      : "(n/a)";

  console.log(`${methodName}`);
  console.log(`  before: ${formatValue(before)}`);
  console.log(`  after : ${formatValue(input)}`);
  console.log(`  result: ${formatValue(result)}`);
  if (mutated !== "(n/a)") {
    console.log(`  mutated original? ${mutated}`);
  }
  console.log();
}

section("Mutating methods");

// push / pop

demo(
    "push(...items)",
    () => ["a", "b"],
    (a) => a.push("c", "d")
);

demo("pop()", () => ["a", "b", "c"], (a) => a.pop());

// unshift / shift

demo(
    "unshift(...items)",
    () => ["c", "d"],
    (a) => a.unshift("a", "b")
);

demo("shift()",
    () => ["a", "b", "c"],
    (a) => a.shift());

// splice

demo(
    "splice(start, deleteCount, ...items)",
    () => ["a", "b", "c", "d"],
    (a) => a.splice(1, 2, "X")
);

// reverse

demo("reverse()", () => ["a", "b", "c"], (a) => a.reverse());

// sort

demo(
    "sort(compareFn?) (default is string order)",
    () => ["b", "a", "c"],
    (a) => a.sort()
);

// Note: for strings, a numeric comparator doesn't make sense; demonstrate
// a custom (still mutating) comparator that reverses alphabetical order.
demo(
    "sort(compareFn) (custom, still mutates)",
    () => ["a", "b", "c"],
    (a) => a.sort((x, y) => y.localeCompare(x))
);

// fill

demo(
    "fill(value, start?, end?)",
    () => ["a", "b", "c", "d"],
    (a) => a.fill("_", 1, 3)
);

// copyWithin

demo(
    "copyWithin(target, start?, end?)",
    () => ["a", "b", "c", "d", "e"],
    (a) => a.copyWithin(0, 3)
);

section("Non-mutating methods");

// forEach (side effects, returns undefined)

demo("forEach(callback)", () => ["a", "b", "c"],
    (a) => {
      const seen = [];
      const ret = a.forEach((v, i) => seen.push([i, v]));
      // Return something meaningful so it's visible in the demo
      return {forEachReturnValue: ret, sideEffect: seen};
    });

// map

demo("map(callback)",
    () => ["a", "b", "c"],
    (a) => a.map((s) => s.toUpperCase()));

// flat / flatMap

demo("flat(depth?)",
    () => ["a", ["b", ["c"]]],
    (a) => a.flat(2));

demo("flatMap(callback)",
    () => ["a", "b", "c"],
    (a) => a.flatMap((x) => [x, x]));

// filter

demo(
    "filter(predicate)",
    () => ["a", "bb", "c", "dd"],
    (a) => a.filter((s) => s.length === 2)
);

// reduce / reduceRight

demo(
    "reduce(reducer, initialValue)",
    () => ["a", "b", "c"],
    (a) => a.reduce((acc, x) => acc + x, "")
);

demo(
    "reduceRight(reducer, initialValue)",
    () => ["a", "b", "c"],
    (a) => a.reduceRight((acc, x) => acc + x, "")
);

// find / findIndex

demo("find(predicate)",
    () => ["a", "bb", "c", "dd"],
    (a) => a.find((x) => x.length === 2));

demo(
    "findIndex(predicate)",
    () => ["a", "bb", "c"],
    (a) => a.findIndex((x) => x.length === 2)
);

// includes / indexOf

demo("includes(value)",
    () => ["a", "b", "c"],
    (a) => a.includes("b"));

demo("indexOf(value)",
    () => ["a", "b", "c"],
    (a) => a.indexOf("b"));

// still useful: includes can find NaN while indexOf can't
// (kept as a mini edge-case demo; not a numeric array example)
demo("includes(value) (SameValueZero, finds NaN)",
    () => [NaN],
    (a) => a.includes(NaN));

demo("indexOf(value) (===, does not find NaN)",
    () => [NaN],
    (a) => a.indexOf(NaN));

// some / every

demo("some(predicate)", () => ["a", "bb", "c"],
    (a) => a.some((x) => x.length === 2));

demo("every(predicate)", () => ["aa", "bb", "cc"],
    (a) => a.every((x) => x.length === 2));

// concat

demo("concat(...arraysOrValues)", () => ["a", "b"],
    (a) => a.concat(["c", "d"], "e"));

// join

demo("join(separator?)",
    () => ["a", "b", "c"],
    (a) => a.join("-"));

// ES2023 copy methods (feature-detected)

section("ES2023 non-mutating copy methods (feature detected)");

const hasToSorted = typeof [].toSorted === "function";
const hasToReversed = typeof [].toReversed === "function";
const hasToSpliced = typeof [].toSpliced === "function";
const hasWith = typeof [].with === "function";

console.log(
    `Node/engine supports: toSorted=${hasToSorted}, toReversed=${hasToReversed}, toSpliced=${hasToSpliced}, with=${hasWith}`);
console.log();

if (hasToSorted) {
  demo("toSorted(compareFn?)",
      () => ["b", "a", "c"],
      (a) => a.toSorted());
} else {
  console.log("toSorted not supported in this runtime.");
  console.log();
}

if (hasToReversed) {
  demo("toReversed()",
      () => ["a", "b", "c"],
      (a) => a.toReversed());
} else {
  console.log("toReversed not supported in this runtime.");
  console.log();
}

if (hasToSpliced) {
  demo(
      "toSpliced(start, deleteCount, ...items)",
      () => ["a", "b", "c", "d"],
      (a) => a.toSpliced(1, 2, "X")
  );
} else {
  console.log("toSpliced not supported in this runtime.");
  console.log();
}

if (hasWith) {
  demo("with(index, value)", () => ["a", "b", "c"], (a) => a.with(1, "B"));
} else {
  console.log("with not supported in this runtime.");
  console.log();
}

section("Done");
console.log(
    "Tip: compare the 'before'/'after' lines to see which methods mutate the original array.");

