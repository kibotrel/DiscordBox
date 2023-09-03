import DiscordJS from 'discord.js'

import * as Defaults from '../defaults/index.js'
import * as Misc from '../miscs/index.js'
import * as Types from '../types/index.js'

import * as Classes from './index.js'

export class DiscordBot {
  public readonly client: DiscordJS.Client
  public readonly clientId?: DiscordJS.Snowflake | undefined
  public readonly gatewayIntents: readonly DiscordJS.GatewayIntentBits[]
  public readonly guildId?: DiscordJS.Snowflake | undefined
  public handledInteractions: DiscordJS.Collection<
    string,
    Types.InteractionHandler
  >
  public handledEvents: Types.EventHandler[]
  public readonly log: Classes.Logger
  public readonly logLevel: Types.LogLevel
  public readonly isSilent: boolean
  private readonly token: string

  constructor(
    config: {
      token: string
      gatewayIntents?: readonly DiscordJS.GatewayIntentBits[]
      clientId?: DiscordJS.Snowflake | undefined
      guildId?: DiscordJS.Snowflake | undefined
      isSilent?: boolean
      logLevel?: Types.LogLevel
    } = { token: '' },
  ) {
    this.gatewayIntents = config.gatewayIntents ?? Defaults.gatewayIntents
    this.client = new DiscordJS.Client({ intents: this.gatewayIntents })
    this.clientId = config.clientId
    this.guildId = config.guildId
    this.token = config.token

    this.isSilent = config.isSilent ?? false
    this.logLevel = config?.logLevel ?? Types.LogLevel.Error
    this.log = new Classes.Logger({
      level: this.logLevel,
      isSilent: this.isSilent,
    })

    this.handledInteractions = new DiscordJS.Collection()
    this.handledEvents = Defaults.handledEvents(
      this.log,
      this.handledInteractions,
    )
  }

  private initEventHandlers() {
    this.log.debug(
      `Initializing ${Misc.pluralizeString({
        count: this.handledEvents.length,
        singular: 'event handler',
      })}...`,
    )

    for (const { name, callback, once } of this.handledEvents) {
      if (!Object.values(DiscordJS.Events).includes(name as DiscordJS.Events)) {
        this.log.warn(`Event ${name} does not exist. Skipping...`)

        continue
      }

      if (once) {
        this.client.once(name, callback)
      } else {
        this.client.on(name, callback)
      }
    }
  }

  public addGenericInteractions(handlers: readonly Types.InteractionHandler[]) {
    for (const handler of handlers) {
      if (typeof handler.action === 'string') {
        this.handledInteractions.set(handler.action, handler)
      } else if (handler.action instanceof DiscordJS.SlashCommandBuilder) {
        this.handledInteractions.set(handler.action.name, handler)
      } else {
        this.log.warn(
          `Interaction ${handler.action} is not a valid interaction. Skipping...`,
        )
      }
    }

    this.log.debug(
      `Bot now handles ${Misc.pluralizeString({
        count: this.handledInteractions.size,
        singular: 'action',
      })}...`,
    )
  }

  /**
   * Deploys globally if `NODE_ENV` is set to `production`, otherwise deploys to the guild specified in `guildId`.
   */
  private async deploySlashCommands() {
    const handledCommands = this.handledInteractions.filter(
      (handler: Types.InteractionHandler) => {
        return handler.action instanceof DiscordJS.SlashCommandBuilder
      },
    )

    if (handledCommands.size === 0) {
      return
    }

    if (!this.clientId) {
      this.log.error('No Discord client ID provided. Aborting...')

      return
    }

    const discordAPI = new DiscordJS.REST({ version: '10' }).setToken(
      this.token,
    )

    if (Misc.isProductionEnvironment()) {
      this.log.debug(
        `Deploying ${Misc.pluralizeString({
          count: handledCommands.size,
          singular: 'slash command',
        })} globally...`,
      )
      await discordAPI.put(
        DiscordJS.Routes.applicationCommands(this.clientId),
        {
          body: handledCommands.map((handler) => {
            return (handler.action as DiscordJS.SlashCommandBuilder).toJSON()
          }),
        },
      )
    } else if (Misc.isDevelopmentEnvironment()) {
      if (!this.guildId) {
        this.log.error('No Discord guild ID provided. Aborting...')

        return
      }

      this.log.debug(
        `Deploying ${Misc.pluralizeString({
          count: handledCommands.size,
          singular: 'guild slash command',
        })}...`,
      )
      await discordAPI.put(
        DiscordJS.Routes.applicationGuildCommands(this.clientId, this.guildId),
        {
          body: handledCommands.map((handler) => {
            return (handler.action as DiscordJS.SlashCommandBuilder).toJSON()
          }),
        },
      )
    }
  }

  /**
   * Will override existing event handlers.
   */
  public setEventHandlers(handlers: Types.EventHandler[]) {
    this.handledEvents = handlers
    this.log.debug(
      `Bot now handles ${Misc.pluralizeString({
        count: this.handledEvents.length,
        singular: 'event',
      })}...`,
    )
  }

  public addEventHandlers(handlers: Types.EventHandler[]) {
    this.handledEvents = [...this.handledEvents, ...handlers]
    this.log.debug(
      `Bot now handles ${Misc.pluralizeString({
        count: this.handledEvents.length,
        singular: 'event',
      })}...`,
    )
  }

  public async start() {
    if (!this.token) {
      this.log.error('No Discord token provided. Aborting...')

      return
    }

    this.initEventHandlers()
    this.deploySlashCommands()
    await this.client.login(this.token)
  }

  /*
   * @TODO: Add various quality of life methods such as:
   * - delete a message.
   * - edit a message.
   * - send a message.
   */
}
