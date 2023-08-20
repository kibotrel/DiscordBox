import DiscordJS from 'discord.js'

import type * as Classes from '../../classes/index.js'
import type * as Types from '../../types/index.js'

export const ready = (
  log: Classes.Logger,
): Types.EventHandler<DiscordJS.Events.ClientReady> => {
  return {
    name: DiscordJS.Events.ClientReady,
    callback: () => {
      log.info('Bot is ready!')
    },
    once: true,
  }
}
