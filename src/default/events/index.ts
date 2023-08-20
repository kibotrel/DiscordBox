import type { Collection } from 'discord.js'

import type { Logger } from '../../class/index.js'
import type {
  DiscordBotButtonActionHandler,
  DiscordBotCommandHandler,
  DiscordBotEventHandler,
} from '../../types/index.js'

import { interactionCreate } from './interactionCreate.js'
import { ready } from './ready.js'

/**
 * Default events that will be handled by the bot.
 * @param log - Logger instance.
 * @param commands - List of handled commands.
 * @param buttons - List of handled buttons.
 * @returns Array of handled events.
 */
export const defaultHandledEvents = (
  log: Logger,
  commands: Collection<string, DiscordBotCommandHandler>,
  buttons: Collection<string, DiscordBotButtonActionHandler>,
) => {
  return [
    ready(log) as DiscordBotEventHandler,
    interactionCreate(log, commands, buttons) as DiscordBotEventHandler,
  ]
}
