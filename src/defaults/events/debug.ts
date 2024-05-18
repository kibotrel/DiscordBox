import chalk from 'chalk'
import * as DiscordJS from 'discord.js'

import type * as Classes from '../../classes/index.js'
import type * as Types from '../../types/index.js'

export const debug = (
  log: Classes.Logger,
): Types.EventHandler<DiscordJS.Events.Debug> => {
  return {
    name: DiscordJS.Events.Debug,
    callback: (message) => {
      log.debug(
        `${chalk.gray('(DiscordJS)')} ${message.replaceAll(/\n\s*/g, ' ')}`,
      )
    },
  }
}
