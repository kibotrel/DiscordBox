import type { GatewayIntentBits, Snowflake } from 'discord.js'
import { Client, Collection, Events, REST, Routes } from 'discord.js'

import {
  defaultGatewayIntents,
  defaultHandledEvents,
} from '../default/index.js'
import {
  isDevelopmentEnvironment,
  isProductionEnvironment,
  pluralizeString,
} from '../misc/index.js'
import type {
  DiscordBotButtonActionHandler,
  DiscordBotCommandHandler,
  DiscordBotEventHandler,
} from '../types/index.js'
import { LogLevel } from '../types/index.js'

import { Logger } from './index.js'

export interface DiscordBotParameters {
  /**
   *  Get it at [Discord's developper portal](https://discord.com/developers/applications).
   */
  readonly token: string
  /**
   *  See [Gateway Intents](https://discordjs.guide/popular-topics/intents.html#privileged-intents) for more details.
   */
  readonly gatewayIntents?: GatewayIntentBits[]
  /**
   *  Mandatory to register [Slash commands](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ) globally.
   */
  readonly clientId?: string
  /**
   *  Mandatory to register [Slash commands](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ) on specific a specific server.
   */
  readonly guildId?: string
  /**
   *  Should the bot log its internal actions in the console?
   */
  readonly isSilent?: boolean
  /**
   *  Log level for internal routines.
   */
  readonly logLevel?: LogLevel
}

export class DiscordBot {
  /**
   *  Discord client that interact with the API
   */
  public readonly client: Client
  /**
   *  Mandatory to register [Slash commands](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ) globally.
   */
  public readonly clientId?: Snowflake
  /**
   *  Bot permissions. See [Gateway Intents](https://discordjs.guide/popular-topics/intents.html#privileged-intents) for more details.
   */
  public readonly gatewayIntents: readonly GatewayIntentBits[]
  /**
   *  Mandatory to register [Slash commands](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ) on specific a specific server.
   */
  public readonly guildId?: Snowflake
  /**
   * List of buttons to handle
   */
  public handledButtons: Collection<string, DiscordBotButtonActionHandler>
  /**
   *  List of commands to handle
   */
  public handledCommands: Collection<string, DiscordBotCommandHandler>
  /**
   *  List of events to handle
   */
  public handledEvents: DiscordBotEventHandler[]
  /**
   *  Basic logger utility, used internally. Enough capabilities to be used in your own code.
   */
  public readonly log: Logger
  /**
   *  Log level for internal routines.
   */
  public readonly logLevel: LogLevel
  /**
   *  Should the bot log its internal actions in the console?
   */
  public readonly isSilent: boolean
  /**
   *  Bot authentication token. Get it at [Discord's developper portal](https://discord.com/developers/applications).
   */
  private readonly token: string

  constructor(config: DiscordBotParameters) {
    this.gatewayIntents = config.gatewayIntents ?? defaultGatewayIntents
    this.client = new Client({ intents: this.gatewayIntents })
    this.clientId = config.clientId as Snowflake
    this.guildId = config.guildId as Snowflake
    this.token = config.token

    this.isSilent = config.isSilent ?? false
    this.logLevel = config?.logLevel ?? LogLevel.Error
    this.log = new Logger({ level: this.logLevel, isSilent: this.isSilent })

    this.handledButtons = new Collection()
    this.handledCommands = new Collection()
    this.handledEvents = defaultHandledEvents(
      this.log,
      this.handledCommands,
      this.handledButtons,
    )
  }

  /**
   * Initialize the event handlers.
   */
  private initEventHandlers() {
    this.log.debug(
      `Initializing ${pluralizeString({
        count: this.handledEvents.length,
        singular: 'event handler',
      })}...`,
    )

    for (const { name, callback, once } of this.handledEvents) {
      if (!Object.values(Events).includes(name as Events)) {
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

  /**
   * Add slash commands handlers for the bot.
   * @param handlers - List of slash commands handlers.
   */
  public addSlashCommands(handlers: readonly DiscordBotCommandHandler[]) {
    for (const handler of handlers) {
      this.handledCommands.set(handler.command.name, handler)
    }

    this.log.debug(
      `Bot now handles ${pluralizeString({
        count: this.handledCommands.size,
        singular: 'slash command',
      })}...`,
    )
  }

  public addButtonActions(handlers: readonly DiscordBotButtonActionHandler[]) {
    for (const handler of handlers) {
      this.handledButtons.set(handler.name, handler)
    }

    this.log.debug(
      `Bot now handles ${pluralizeString({
        count: this.handledButtons.size,
        singular: 'button action',
      })}...`,
    )
  }

  /**
   * Deploy slash commands to Discord's API. Deploys globally if `NODE_ENV` is set to `production`, otherwise deploys to the guild specified in `guildId`.
   */
  private async deploySlashCommands() {
    if (this.handledCommands.size === 0) {
      return
    }

    if (!this.clientId) {
      this.log.error('No Discord client ID provided. Aborting...')

      return
    }

    const discordAPI = new REST({ version: '10' }).setToken(this.token)

    if (isProductionEnvironment()) {
      this.log.debug(
        `Deploying ${pluralizeString({
          count: this.handledCommands.size,
          singular: 'slash command',
        })} globally...`,
      )
      await discordAPI.put(Routes.applicationCommands(this.clientId), {
        body: this.handledCommands.map((handler) => {
          return handler.command.toJSON()
        }),
      })
    } else if (isDevelopmentEnvironment()) {
      if (!this.guildId) {
        this.log.error('No Discord guild ID provided. Aborting...')

        return
      }

      this.log.debug(
        `Deploying ${pluralizeString({
          count: this.handledCommands.size,
          singular: 'guild slash command',
        })}...`,
      )
      await discordAPI.put(
        Routes.applicationGuildCommands(this.clientId, this.guildId),
        {
          body: this.handledCommands.map((handler) => {
            return handler.command.toJSON()
          }),
        },
      )
    }
  }

  /**
   * Set the event handlers for the bot. **Will override existing event handlers.**
   * @param handlers - List of event handlers.
   */
  public setEventHandlers(handlers: DiscordBotEventHandler[]) {
    this.handledEvents = handlers
    this.log.debug(
      `Bot now handles ${pluralizeString({
        count: this.handledEvents.length,
        singular: 'event',
      })}...`,
    )
  }

  /**
   * Add event handlers for the bot.
   * @param handlers - List of event handlers
   */
  public addEventHandlers(handlers: DiscordBotEventHandler[]) {
    this.handledEvents = [...this.handledEvents, ...handlers]
    this.log.debug(
      `Bot now handles ${pluralizeString({
        count: this.handledEvents.length,
        singular: 'event',
      })}...`,
    )
  }

  /**
   * Allows the bot to connect to Discord's API and start listening to events.
   */
  public async start() {
    if (!this.token) {
      this.log.error('No Discord token provided. Aborting...')

      return
    }

    this.initEventHandlers()
    this.deploySlashCommands()
    await this.client.login(this.token)
  }
}
