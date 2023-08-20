import DiscordJS from 'discord.js'

import type * as Classes from '../../classes/index.js'
import * as Misc from '../../miscs/index.js'
import type * as Types from '../../types/index.js'

const handleCommand = async (
  interaction: DiscordJS.CommandInteraction,
  metadata: Types.InteractionMetadata,
  actions: DiscordJS.Collection<string, Types.InteractionHandler>,
  log: Classes.Logger,
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
      return `${key}: ${Misc.prettifyVariable(value)}`
    },
  )

  log.info(
    `Slash command ${Misc.prettifyVariable(metadata.requestId)} - ${
      metadata.commandName
    } invoked${promptedArguments.length > 0 ? ' with ' : ''}${Misc.prettifyList(
      promptedArguments,
    )}.`,
  )

  const command = actions.get(metadata.commandName as string)

  await command?.callback(interaction, metadata)
}

const handleButton = async (
  interaction: DiscordJS.ButtonInteraction,
  metadata: Types.InteractionMetadata,
  actions: DiscordJS.Collection<string, Types.InteractionHandler>,
  log: Classes.Logger,
) => {
  const { customId } = interaction
  const [, actionName, additionalData] = customId.split(':')

  Object.assign(metadata, { actionName, additionalData })
  Object.freeze(metadata)

  log.info(
    `Button ${Misc.prettifyVariable(metadata.requestId)} - ${
      metadata.actionName
    } clicked.`,
  )

  const button = actions.get(actionName)

  await button?.callback(interaction, metadata)
}

const handleSelectMenu = async (
  interaction: DiscordJS.AnySelectMenuInteraction,
  metadata: Types.InteractionMetadata,
  actions: DiscordJS.Collection<string, Types.InteractionHandler>,
  log: Classes.Logger,
) => {
  /*
   * Need further investigation on how to handle multiple select menus.
   * It shouldn't be possible to handle multiple choices that trigger different actions.
   * at once.
   */
  const { customId, values } = interaction
  const [, actionName, additionalData] = customId.split(':')

  Object.assign(metadata, {
    actionName,
    additionalData,
    selectedOptions: values ?? [],
  })
  Object.freeze(metadata)

  log.info(
    `Select menu ${Misc.prettifyVariable(metadata.requestId)} - ${
      metadata.actionName
    } selected.`,
  )

  const action = actions.get(actionName)

  await action?.callback(interaction, metadata)
}

export const interactionCreate = (
  log: Classes.Logger,
  actions: DiscordJS.Collection<string, Types.InteractionHandler>,
): Types.EventHandler<DiscordJS.Events.InteractionCreate> => {
  return {
    name: DiscordJS.Events.InteractionCreate,
    callback: async (interaction: DiscordJS.BaseInteraction) => {
      const metadata: Types.InteractionMetadata = {
        requestId: Misc.randomString(),
        userId: interaction.user?.id as string,
        channelId: interaction.channelId as string,
      }

      if (interaction.isCommand()) {
        await handleCommand(interaction, metadata, actions, log)
      } else if (interaction.isButton()) {
        await handleButton(interaction, metadata, actions, log)
      } else if (interaction.isAnySelectMenu()) {
        await handleSelectMenu(interaction, metadata, actions, log)
      }
    },
  }
}
