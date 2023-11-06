import DiscordJS from 'discord.js'

import * as Constants from '../../constants/index.js'
import * as Defaults from '../../defaults/index.js'
import * as Misc from '../../miscs/index.js'

export const errorEmbed = (errorMessage: string): DiscordJS.EmbedBuilder => {
  const embed = new DiscordJS.EmbedBuilder()
    .setTitle('Something went wrong!')
    .setColor(Defaults.EmbedColors.Error)
  const reportMessage =
    'If the error persists, use the button below to report it. Thank you!'

  if (errorMessage === Constants.ErrorMessages.InternalError) {
    embed.setDescription(
      `An unexpected or internal error occurred while processing your request. Please try again in few seconds.\n\u200B\n${reportMessage}`,
    )
  } else {
    embed.setDescription(
      `An error occurred while processing your request. Check the details below and try again if needed.\n\u200B\n:mag: **Description**\n${Misc.codeBlock(
        errorMessage,
      )}\n${reportMessage}`,
    )
  }

  return embed
}

export const sentReportFollowUpEmbed = (
  toUserId: string,
): DiscordJS.EmbedBuilder => {
  return new DiscordJS.EmbedBuilder()
    .setTitle('Report sent!')
    .setColor(Defaults.EmbedColors.Info)
    .setDescription(
      `The encountered error details were sent to <@${toUserId}>. Thanks for your report.`,
    )
}

export const errorReportEmbed = (
  fromUserId: string,
): DiscordJS.EmbedBuilder => {
  return new DiscordJS.EmbedBuilder()
    .setTitle('New error report!')
    .setColor(Defaults.EmbedColors.Info)
    .setDescription(
      `An error occurred while processing a request from <@${fromUserId}>.`,
    )
    .setTimestamp()
}
