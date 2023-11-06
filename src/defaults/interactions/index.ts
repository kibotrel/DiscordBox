import type * as Classes from '../../classes/index.js'
import type * as Types from '../../types/index.js'

import { deleteMessage } from './deleteMessage.js'
import { getErrorLog } from './getErrorLog.js'
import { sendErrorReport } from './sendErrorReport.js'

export const handledInteractions = (
  discordBot: Classes.DiscordBot,
): Types.InteractionHandler[] => {
  return [getErrorLog(), sendErrorReport(discordBot), deleteMessage(discordBot)]
}
