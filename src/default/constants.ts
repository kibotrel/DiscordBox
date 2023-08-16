import { GatewayIntentBits } from 'discord.js'

/**
 * Default [Gateway Intents](https://discordjs.guide/popular-topics/intents.html#privileged-intents) that will be used by the bot.
 */
export const defaultGatewayIntents: readonly GatewayIntentBits[] = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
]
