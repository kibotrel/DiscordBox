import { randomBytes } from 'node:crypto'

/**
 * Generate a cryptographically secure random string.
 * @param length - The length of the string to generate. Defaults to 16.
 * @returns A random string.
 */
export const randomString = (length: number = 16) => {
  return randomBytes(length).toString('hex').slice(0, length)
}
