import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

import type { ButtonBuilder } from 'discord.js'
import DiscordJS from 'discord.js'

import * as Classes from '../../classes/index.js'
import * as Constants from '../../constants/index.js'
import * as Defaults from '../../defaults/index.js'
import * as Misc from '../../miscs/index.js'
import type * as Types from '../../types/index.js'

const dirname = url.fileURLToPath(new URL('.', import.meta.url))
const logDirectory = path.join(dirname, '../../../logs')

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

  log.info(
    `Slash command ${Misc.prettifyVariable(metadata.requestId)} - ${
      metadata.commandName
    } invoked${
      Object.keys(commandArguments).length > 0 ? ' with ' : ''
    }${Misc.prettifyObject(commandArguments)}.`,
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
  const {
    customId,
    message: { id, channelId },
  } = interaction
  const [, actionName, previousRequestId, additionalData] = customId.split(':')

  Object.assign(metadata, {
    actionName,
    previousRequestId,
    additionalData,
    messageId: id,
    channelId,
  })
  Object.freeze(metadata)

  log.info(
    `Button ${Misc.prettifyVariable(metadata.requestId)}${
      metadata?.previousRequestId
        ? ` (from ${Misc.prettifyVariable(metadata.previousRequestId)}) `
        : ' '
    }- ${metadata.actionName} clicked.`,
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
   * @TODO: Need further investigation on how to handle multiple select menus.
   * It shouldn't be possible to handle multiple choices that trigger different actions.
   * at once.
   */
  const {
    customId,
    values,
    message: { id, channelId },
  } = interaction
  const [, actionName, previousRequestId, additionalData] = customId.split(':')

  Object.assign(metadata, {
    actionName,
    additionalData,
    previousRequestId,
    selectedOptions: values ?? [],
    messageId: id,
    channelId,
  })
  Object.freeze(metadata)

  log.info(
    `Select menu ${Misc.prettifyVariable(metadata.requestId)}${
      metadata?.previousRequestId
        ? ` (from ${Misc.prettifyVariable(metadata.previousRequestId)}) `
        : ' '
    }- ${metadata.actionName} called with ${Misc.prettifyArray(
      metadata.selectedOptions as string[],
    )}.`,
  )

  const action = actions.get(actionName)

  await action?.callback(interaction, metadata)
}

const handleModal = async (
  interaction: DiscordJS.ModalSubmitInteraction,
  metadata: Types.InteractionMetadata,
  actions: DiscordJS.Collection<string, Types.InteractionHandler>,
  log: Classes.Logger,
) => {
  const {
    customId,
    fields: { fields },
  } = interaction
  const [, actionName, previousRequestId, additionalData] = customId.split(':')
  const modalFields = new DiscordJS.Collection<string, string>(
    Array.from(fields, ([key, value]) => {
      return [key, value.value as string]
    }),
  )

  Object.assign(metadata, {
    actionName,
    additionalData,
    modalFields,
    previousRequestId,
  })
  Object.freeze(metadata)

  log.info(
    `Modal ${Misc.prettifyVariable(metadata.requestId)}${
      metadata?.previousRequestId
        ? ` (from ${Misc.prettifyVariable(metadata.previousRequestId)}) `
        : ' '
    }- ${metadata.actionName}submitted with ${Misc.prettifyObject(
      Object.fromEntries(modalFields),
    )}.`,
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
      /*
       * @TODO: Add a property for previous request ID to be able to deeply track the request.
       * It will be found in 4th section of interaction.customId.
       */
      const metadata: Types.InteractionMetadata = {
        requestId: Misc.randomString(),
        userId: interaction.user?.id as string,
        channelId: interaction.channelId as string,
      }

      try {
        if (interaction.isCommand()) {
          await handleCommand(interaction, metadata, actions, log)
        } else if (interaction.isButton()) {
          await handleButton(interaction, metadata, actions, log)
        } else if (interaction.isAnySelectMenu()) {
          await handleSelectMenu(interaction, metadata, actions, log)
        } else if (interaction.isModalSubmit()) {
          await handleModal(interaction, metadata, actions, log)
        } else {
          throw new Classes.InternalError(
            `Unknown interaction type (${interaction.type}) received.`,
          )
        }
      } catch (error: unknown) {
        const faultyInteraction = interaction as Types.InteractionTypes
        let errorMessage = ''

        if (error instanceof Error) {
          errorMessage =
            error instanceof Classes.GenericError &&
            !(error instanceof Classes.InternalError)
              ? error.message
              : Constants.ErrorMessages.InternalError

          log.error(
            `Interraction ${Misc.prettifyVariable(metadata.requestId)} - ${
              error.message
            }`,
          )

          await fs.mkdir(logDirectory, { recursive: true })
          await fs.writeFile(
            path.join(logDirectory, `${metadata.requestId}.log`),
            error.stack as string,
            'utf8',
          )
        } else {
          errorMessage =
            typeof error === 'string'
              ? error
              : Constants.ErrorMessages.InternalError
          console.log(error)
        }

        const message = {
          embeds: [Defaults.errorEmbed(errorMessage)],
          ephemeral: true,
          components: [
            new DiscordJS.ActionRowBuilder<ButtonBuilder>().addComponents(
              Defaults.sendReportButton({
                sourceRequestId: metadata.requestId,
              }),
            ),
          ],
        }

        await (faultyInteraction.replied
          ? faultyInteraction.followUp(message)
          : faultyInteraction.reply(message))
      }
    },
  }
}
