# unnullish

[![npm](http://img.shields.io/badge/available%20on-npm-lightgrey.svg?logo=npm&logoColor=white)](https://www.npmjs.com/package/unnullish)
[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/unnullish)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/unnullish/mod.ts)
[![Test](https://github.com/lambdalisue/deno-unnullish/workflows/Test/badge.svg)](https://github.com/lambdalisue/deno-unnullish/actions?query=workflow%3ATest)
[![npm version](https://badge.fury.io/js/unnullish.svg)](https://badge.fury.io/js/unnullish)

`unnullish` returns `undefined` if `value` is nullish, otherwise it executes
`callback` and returns the result. It is an opposite function of the
[nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
(`??`).

[nullish coalescing operator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator

## Usage

### unnullish

- `unnullish<T, R>(value: T | null | undefined, callback(v: T) => R): R | undefined`

The function is useful when you want to apply some transformation functions to
optional values. For example,

```typescript
import { unnullish } from "./mod.ts";

type Options = {
  foo?: string;
  bar?: number;
};

function sayHello(v: string): string {
  return `Hello ${v}`;
}

const options: Options = {
  foo: unnullish(Deno.env.get("foo"), (v) => sayHello(v)),
  // instead of
  //foo: Deno.env.get("foo") != null
  //  ? sayHello(Deno.env.get("foo"))
  //  : undefined,

  bar: unnullish(Deno.env.get("bar"), (v) => parseInt(v, 10)),
  // instead of
  //bar: Deno.env.get("bar") != null
  //  ? parseInt(Deno.env.get("bar"), 10)
  //  : undefined,
};
```

Note that the function returns `undefined` even the input is `null`, mean that
you may need to use nullish coalescing operator to normalize the result. For
example,

```typescript
import { unnullish } from "./mod.ts";

console.log(unnullish(null, () => 0));
// -> undefined
console.log(unnullish(undefined, () => 0));
// -> undefined

console.log(unnullish(null, () => 0) ?? null);
// -> null
console.log(unnullish(undefined, () => 0) ?? null);
// -> null
```

##### Deno

Use `import { unnullish } from "https://deno.land/x/unnullish/mod.ts"`;

##### Node

Use `import { unnullish } from "unnullish"`;

## License

The code follows MIT license written in [LICENSE](./LICENSE). Contributors need
to agree that any modifications sent in this repository follow the license.
