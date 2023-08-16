import type { Logger } from '../../class/index.js'
import type {
  DiscordBotCommandHandler,
  DiscordBotEventHandler,
} from '../../types/index.js'

import { interactionCreate } from './interactionCreate.js'
import { ready } from './ready.js'

/**
 * Default events that will be handled by the bot.
 * @param log - Logger instance.
 * @param commands - List of handled commands.
 * @returns Array of handled events.
 */
export const defaultHandledEvents = (
  log: Logger,
  commands: readonly DiscordBotCommandHandler[],
) => {
  return [
    ready(log) as DiscordBotEventHandler,
    interactionCreate(log, commands) as DiscordBotEventHandler,
  ]
}
