import chalk from 'chalk'
import * as DiscordJS from 'discord.js'

import type * as Classes from '../../classes/index.js'
import type * as Types from '../../types/index.js'

export const warn = (
  log: Classes.Logger,
): Types.EventHandler<DiscordJS.Events.Warn> => {
  return {
    name: DiscordJS.Events.Warn,
    callback: (message) => {
      log.warn(
        `${chalk.gray('(DiscordJS)')} ${message.replaceAll(/\n\s*/g, ' ')}`,
      )
    },
  }
}
