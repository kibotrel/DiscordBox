import * as DiscordJS from 'discord.js'

export const gatewayIntents: readonly DiscordJS.GatewayIntentBits[] = [
  DiscordJS.GatewayIntentBits.Guilds,
  DiscordJS.GatewayIntentBits.GuildMessages,
]

export enum ActionNames {
  DeleteMessage = 'deleteMessage',
  GetErrorLog = 'getErrorLog',
  None = 'none',
  SendErrorReport = 'sendErrorReport',
}

export const buttonComponentProperties = {
  label: 'Placeholder',
  customId: `:${ActionNames.None}::`,
  style: DiscordJS.ButtonStyle.Primary,
}

export enum EmbedColors {
  Error = 0xed_42_45,
  Success = 0x00_ff_00,
  Info = 0x2b_52_d1,
}

export enum Emojis {
  Enveloppe = '✉️',
}
