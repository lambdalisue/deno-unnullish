export type Nullish = undefined | null;

/**
 * Returns `undefined` if `value` is nullish, otherwise
 * it executes `callback` and returns the result.
 *
 * This function is the opposite of the Nullish coalescing operator (??).
 */
export function unnullish<T, R>(
  value: T | Nullish,
  callback: (v: T) => R,
): R | undefined {
  if (value == null) {
    return undefined;
  }
  return callback(value);
}
