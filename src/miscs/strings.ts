import crypto from 'node:crypto'

import type * as Types from '../types/index.js'

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

/**
 * Generate a valid Discord custom ID for buttons, select menus, etc so that discordbox can understand them.
 */
export const generateCustomId = <ActionNames>(
  actionName: ActionNames,
  options: Partial<Types.CustomIdParts> = {},
) => {
  const { previousRequestId = '', additionalData = '' } = options
  const uniqueId = randomString()

  return `${uniqueId}:${actionName}:${previousRequestId}:${additionalData}`
}
