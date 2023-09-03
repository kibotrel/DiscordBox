import chalk from 'chalk'
import DiscordJS from 'discord.js'

import type * as Classes from '../../classes/index.js'
import type * as Types from '../../types/index.js'

export const error = (
  log: Classes.Logger,
): Types.EventHandler<DiscordJS.Events.Error> => {
  return {
    name: DiscordJS.Events.Error,
    callback: (message) => {
      log.error(`${chalk.gray('(DiscordJS)')} ${message}`)
    },
  }
}
