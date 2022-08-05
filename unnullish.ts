type Nullish = undefined | null;

/**
 * Returns the value as is if `value` is nullish, otherwise
 * it executes `callback` and returns the result.
 *
 * This function is the opposite of the Nullish coalescing operator (??).
 */
export function unnullish<T, R>(
  value: T | Nullish,
  callback: (value: T) => R,
): R | Nullish {
  if (value == null) {
    return value as Nullish;
  }
  return callback(value);
}
