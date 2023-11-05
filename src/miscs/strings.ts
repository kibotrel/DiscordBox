import crypto from 'node:crypto'

/**
 * Generate a cryptographically secure random string.
 */
export const randomString = (length: number = 16) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length)
}

/**
 * Format text as Markdown code block.
 */
export const codeBlock = (code: string, language: string = '') => {
  return `\`\`\`${language}\n${code}\n\`\`\``
}
