import DiscordJS from 'discord.js'

export const gatewayIntents: readonly DiscordJS.GatewayIntentBits[] = [
  DiscordJS.GatewayIntentBits.Guilds,
  DiscordJS.GatewayIntentBits.GuildMessages,
]

export const buttonActionName = 'noAction'

export const buttonComponentProperties = {
  label: 'Placeholder',
  customId: `:${buttonActionName}::`,
  style: DiscordJS.ButtonStyle.Primary,
}
