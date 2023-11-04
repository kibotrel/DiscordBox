import * as DiscordJS from 'discord.js'

import * as Misc from '../../miscs/strings.js'
import type * as Types from '../../types/index.js'
import * as Defaults from '../index.js'

interface CustomButtonBuilder {
  build: () => DiscordJS.ButtonBuilder
  setCustomId: (customIdParts: Types.CustomIdParts) => CustomButtonBuilder
  setDisabled: (isDisabled: boolean) => CustomButtonBuilder
  setEmoji: (emoji: DiscordJS.ComponentEmojiResolvable) => CustomButtonBuilder
  setLabel: (label: string) => CustomButtonBuilder
  setStyle: (style: DiscordJS.ButtonStyle) => CustomButtonBuilder
  setURL: (url: string) => CustomButtonBuilder
}

export const customButtonBuilder = () => {
  const button = new DiscordJS.ButtonBuilder()
    .setLabel(Defaults.buttonComponentProperties.label)
    .setCustomId(Defaults.buttonComponentProperties.customId)
    .setStyle(Defaults.buttonComponentProperties.style)
  const builder: CustomButtonBuilder = {
    build: (): DiscordJS.ButtonBuilder => {
      return button
    },

    setCustomId: ({
      uniqueId = Misc.randomString(),
      actionName,
      previousRequestId = '',
      additionalData = '',
    }): CustomButtonBuilder => {
      button.setCustomId(
        `${uniqueId}:${actionName}:${previousRequestId}:${additionalData}`,
      )

      return builder
    },

    setDisabled: (isDisabled): CustomButtonBuilder => {
      button.setDisabled(isDisabled)

      return builder
    },

    setEmoji: (emoji): CustomButtonBuilder => {
      button.setEmoji(emoji)

      return builder
    },

    setLabel: (label): CustomButtonBuilder => {
      button.setLabel(label)

      return builder
    },

    setStyle: (style): CustomButtonBuilder => {
      button.setStyle(style)

      return builder
    },

    setURL: (url): CustomButtonBuilder => {
      button.setURL(url)

      return builder
    },
  }

  return builder
}
