import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

import type { ButtonBuilder } from 'discord.js'
import * as DiscordJS from 'discord.js'

import * as Classes from '../../classes/index.js'
import * as Misc from '../../miscs/index.js'
import type * as Types from '../../types/index.js'
import * as Defaults from '../index.js'

const dirname = url.fileURLToPath(new URL('.', import.meta.url))
const logDirectory = path.join(dirname, '../../../logs')

export const getErrorLog = (): Types.InteractionHandler => {
  return {
    action: Defaults.ActionNames.GetErrorLog,
    callback: async (interaction, metadata) => {
      const updatableInteraction =
        interaction as DiscordJS.MessageComponentInteraction
      const fileName = metadata?.additionalData

      await updatableInteraction.update({
        components: [
          new DiscordJS.ActionRowBuilder<ButtonBuilder>().addComponents(
            Defaults.deleteMessageButton({
              sourceRequestId: metadata?.previousRequestId as string,
              isDisabled: false,
            }),
            Defaults.getErrorLogButton({
              sourceRequestId: '',
              isDisabled: true,
            }),
          ),
        ],
      })

      if (!fileName) {
        throw new Classes.InternalError(
          'No log file id provided in additional data.',
        )
      }

      const filePath = path.join(logDirectory, `${fileName}.log`)
      const doFileExist = await fs.existsSync(filePath)

      if (!doFileExist) {
        throw new Classes.UnprocessableContentError(`Log file not found.`)
      }

      const fileContent = await fs.promises.readFile(filePath, 'utf8')

      await updatableInteraction.followUp({
        content: Misc.codeBlock(fileContent),
        ephemeral: true,
      })
      await fs.promises.unlink(filePath)
    },
  }
}
