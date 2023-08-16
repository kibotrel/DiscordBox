import { Events } from 'discord.js'

import type { Logger } from '../../class/index.js'
import type { DiscordBotEventHandler } from '../../index.js'

export const ready = (
  log: Logger,
): DiscordBotEventHandler<Events.ClientReady> => {
  return {
    name: Events.ClientReady,
    callback: () => {
      log.info('Bot is ready!')
    },
    once: true,
  }
}
