import type {
  BaseInteraction,
  ButtonInteraction,
  Collection,
  CommandInteraction,
} from 'discord.js'
import { Events } from 'discord.js'

import type { Logger } from '../../class/index.js'
import {
  prettifyList,
  prettifyVariable,
  randomString,
} from '../../misc/index.js'
import type {
  DiscordBotButtonActionHandler,
  DiscordBotCommandHandler,
  DiscordBotEventHandler,
  InteractionMetadata,
} from '../../types/index.js'

const handleCommand = async (
  interaction: CommandInteraction,
  metadata: InteractionMetadata,
  commands: Collection<string, DiscordBotCommandHandler>,
  log: Logger,
) => {
  const { commandName, options } = interaction
  const commandArguments = Object.fromEntries(
    options.data.map(({ name, value }) => {
      return [name, value]
    }),
  )

  Object.assign(metadata, { commandName, commandArguments })
  Object.freeze(metadata)

  const promptedArguments = Object.entries(commandArguments).map(
    ([key, value]) => {
      return `${key}: ${prettifyVariable(value)}`
    },
  )

  log.info(
    `Slash command ${prettifyVariable(metadata.requestId)} - ${
      metadata.commandName
    } invoked${promptedArguments.length > 0 ? ' with ' : ''}${prettifyList(
      promptedArguments,
    )}.`,
  )

  const command = commands.get(metadata.commandName as string)

  await command?.callback(interaction, metadata)
}

const handleButton = async (
  interaction: ButtonInteraction,
  metadata: InteractionMetadata,
  buttons: Collection<string, DiscordBotButtonActionHandler>,
  log: Logger,
) => {
  log.info(metadata)

  const button = buttons.get(interaction.customId)

  await button?.callback(interaction, metadata)
}

export const interactionCreate = (
  log: Logger,
  commands: Collection<string, DiscordBotCommandHandler>,
  buttons: Collection<string, DiscordBotButtonActionHandler>,
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
        await handleCommand(interaction, metadata, commands, log)
      } else if (interaction.isButton()) {
        await handleButton(interaction, metadata, buttons, log)
      }
    },
  }
}
