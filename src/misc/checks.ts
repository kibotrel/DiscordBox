/**
 * Check if a value is an object.
 * @param value - The value to check.
 * @returns Whether the value is an object.
 */
export const isObjectOrArray = (value: unknown) =>
  (typeof value === 'object' || Array.isArray(value)) && value !== null
