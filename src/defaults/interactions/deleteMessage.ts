import type * as Classes from '../../classes/index.js'
import * as Defaults from '../../defaults/index.js'
import type * as Types from '../../types/index.js'

export const deleteMessage = (
  discordBot: Classes.DiscordBot,
): Types.InteractionHandler => {
  return {
    action: Defaults.ActionNames.DeleteMessage,
    callback: async (_, metadata) => {
      await discordBot.deleteMessage(
        metadata?.channelId as string,
        metadata?.messageId as string,
      )
    },
  }
}
