import { assertEquals } from "@std/assert";
import { unreachable } from "@lambdalisue/unreachable";
import { unnullish } from "./unnullish.ts";

Deno.test("unnullish() returns undefined when the value is undefined", () => {
  assertEquals(unnullish(undefined, unreachable), undefined);
  // Type-check
  const _: string | undefined = unnullish("" as string | undefined, () => "");
});

Deno.test("unnullish() returns undefined when the value is null", () => {
  assertEquals(unnullish(null, unreachable), undefined);
  // Type-check
  const _: string | undefined = unnullish("" as string | null, () => "");
});

Deno.test("unnullish() returns the result of the callback when the value is string", () => {
  assertEquals(unnullish("hello", (v) => v.toUpperCase()), "HELLO");
});

Deno.test("unnullish() returns the result of the callback when the value is number", () => {
  assertEquals(unnullish(10, (v) => v * 2), 20);
});

Deno.test("unnullish() returns the result of the callback when the value is array", () => {
  assertEquals(
    unnullish(["a", "b", "c"], (v) => v.map((v) => v.toUpperCase())),
    ["A", "B", "C"],
  );
});

Deno.test("unnullish() returns the result of the callback when the value is object", () => {
  assertEquals(
    unnullish({ a: "a", b: "b", c: "c" }, (v) => ({ d: "d", ...v })),
    { a: "a", b: "b", c: "c", d: "d" },
  );
});
