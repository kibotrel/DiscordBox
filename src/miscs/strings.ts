import crypto from 'node:crypto'

/**
 * Generate a cryptographically secure random string.
 */
export const randomString = (length: number = 16) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length)
}
