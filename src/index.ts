import type { ButtonInteraction, CommandInteraction } from 'discord.js'
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} from 'discord.js'
import dotenv from 'dotenv'

import { DiscordBot } from './class/index.js'
import type { DiscordBotButtonActionHandler } from './types/index.js'
import { LogLevel } from './types/index.js'

export * from './class/index.js'
export * from './default/index.js'
export * from './types/index.js'

dotenv.config()

const bot = new DiscordBot({
  token: process.env.DISCORD_TOKEN as string,
  clientId: process.env.DISCORD_CLIENT_ID as string,
  guildId: process.env.DISCORD_GUILD_ID as string,
  logLevel: LogLevel.Debug,
})
const ping = {
  command: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Sends pong!') as SlashCommandBuilder,

  callback: async (interaction: CommandInteraction) => {
    await interaction.reply({
      content: 'Pong!',
      ephemeral: true,
      components: [
        new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setLabel('test')
            .setStyle(ButtonStyle.Primary)
            .setCustomId('basicButton'),
        ]) as ActionRowBuilder<ButtonBuilder>,
      ],
    })
  },
}
const basicButton: DiscordBotButtonActionHandler = {
  name: 'basicButton',
  callback: async (interaction: ButtonInteraction) => {
    await interaction.reply({
      content: interaction.customId,
      ephemeral: true,
    })
  },
}

/*
 *
 * const deleteMessage = {
 *
 * }
 */

bot.addSlashCommands([ping])
bot.addButtonActions([basicButton])
bot.start()
