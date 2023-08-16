import type { BaseInteraction } from 'discord.js'
import { Events } from 'discord.js'

import type { Logger } from '../../class/index.js'
import {
  prettifyList,
  prettifyVariable,
  randomString,
} from '../../misc/index.js'
import type {
  DiscordBotCommandHandler,
  DiscordBotEventHandler,
  InteractionMetadata,
} from '../../types/index.js'

export const interactionCreate = (
  log: Logger,
  commands: readonly DiscordBotCommandHandler[],
): DiscordBotEventHandler<Events.InteractionCreate> => {
  return {
    name: Events.InteractionCreate,
    callback: async (interaction: BaseInteraction) => {
      const metadata: InteractionMetadata = {
        requestId: randomString(),
        userId: interaction.user?.id as string,
        channelId: interaction.channelId as string,
      }

      if (interaction.isCommand()) {
        const { commandName, options } = interaction
        const commandArguments = Object.fromEntries(
          options.data.map(({ name, value }) => {
            return [name, value]
          }),
        )

        Object.assign(metadata, { commandName, commandArguments })
        Object.freeze(metadata)

        const promptedArguments = Object.entries(commandArguments).map(
          ([key, value]) => `${key}: ${prettifyVariable(value)}`,
        )

        log.info(
          `Slash command ${prettifyVariable(metadata.requestId)} - ${
            metadata.commandName
          } invoked with ${prettifyList(promptedArguments)}.`,
        )

        const command = commands.find(
          (handler) => handler.command.name === metadata.commandName,
        )

        await command?.callback(interaction, metadata)
      } else if (interaction.isButton()) {
        const { customId } = interaction

        Object.assign(metadata, { customId })
        Object.freeze(metadata)

        log.info(metadata)
      }
    },
  }
}
