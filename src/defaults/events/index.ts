import type * as DiscordJS from 'discord.js'

import type * as Classes from '../../classes/index.js'
import type * as Types from '../../types/index.js'

import { debug } from './debug.js'
import { error } from './error.js'
import { interactionCreate } from './interactionCreate.js'
import { ready } from './ready.js'
import { warn } from './warn.js'

export const handledEvents = (
  log: Classes.Logger,
  actions: DiscordJS.Collection<string, Types.InteractionHandler>,
): Types.EventHandler[] => {
  return [
    debug(log),
    error(log),
    interactionCreate(log, actions),
    ready(log),
    warn(log),
  ] as Types.EventHandler[]
}
