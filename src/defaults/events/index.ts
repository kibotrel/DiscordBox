import type * as DiscordJS from 'discord.js'

import type * as Classes from '../../classes/index.js'
import type * as Types from '../../types/index.js'

import { interactionCreate } from './interactionCreate.js'
import { ready } from './ready.js'

export const handledEvents = (
  log: Classes.Logger,
  actions: DiscordJS.Collection<string, Types.InteractionHandler>,
): Types.EventHandler[] => {
  return [ready(log), interactionCreate(log, actions)] as Types.EventHandler[]
}
