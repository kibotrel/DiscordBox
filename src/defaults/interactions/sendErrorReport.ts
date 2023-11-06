import type { ButtonBuilder } from 'discord.js'
import DiscordJS from 'discord.js'

import type * as Classes from '../../classes/index.js'
import * as Defaults from '../../defaults/index.js'
import type * as Types from '../../types/index.js'

export const sendErrorReport = (
  discordBot: Classes.DiscordBot,
): Types.InteractionHandler => {
  return {
    action: Defaults.ActionNames.SendErrorReport,
    callback: async (interaction, metadata) => {
      const updatableInteraction =
        interaction as DiscordJS.MessageComponentInteraction

      await updatableInteraction.update({
        components: [
          new DiscordJS.ActionRowBuilder<ButtonBuilder>().addComponents(
            Defaults.sendReportButton({
              sourceRequestId: '',
              isDisabled: true,
            }),
          ),
        ],
      })
      await discordBot.sendDirectMessage(metadata?.userId as string, {
        embeds: [Defaults.errorReportEmbed(metadata?.userId as string)],
        components: [
          new DiscordJS.ActionRowBuilder<ButtonBuilder>().addComponents(
            Defaults.deleteMessageButton({
              sourceRequestId: metadata?.requestId as string,
            }),
            Defaults.getErrorLogButton({
              sourceRequestId: metadata?.requestId as string,
              additionalData: metadata?.additionalData as string,
            }),
          ),
        ],
      })
      await updatableInteraction.followUp({
        embeds: [Defaults.sentReportFollowUpEmbed(discordBot.supportUserId)],
        ephemeral: true,
      })
    },
  }
}
