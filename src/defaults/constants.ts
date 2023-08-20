import DiscordJS from 'discord.js'

export const gatewayIntents: readonly DiscordJS.GatewayIntentBits[] = [
  DiscordJS.GatewayIntentBits.Guilds,
  DiscordJS.GatewayIntentBits.GuildMessages,
]
