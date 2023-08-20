import type {
  ButtonInteraction,
  ClientEvents,
  CommandInteraction,
  SlashCommandBuilder,
} from 'discord.js'

export interface DiscordBotEventHandler<
  T extends keyof ClientEvents = keyof ClientEvents,
> {
  /**
   * Must be one of [Discord.js handled events](https://old.discordjs.dev/#/docs/discord.js/main/typedef/Events).
   */
  readonly name: T
  /**
   * Function that will be execute once the event is received with aditionnal data if needed.
   */
  readonly callback: (...parameters: ClientEvents[T]) => void | Promise<void>
  /**
   * If the event should be tracked once or indefinitely.
   */
  readonly once?: boolean
}

export interface InteractionMetadata {
  /**
   * Unique ID to track the request.
   */
  readonly requestId: string
  /**
   * User ID of the user who sent the interaction.
   */
  readonly userId: string
  /**
   * Channel ID where the interaction was sent.
   */
  channelId: string
  /**
   * The command name if the interaction is a command.
   */
  readonly commandName?: string
  /**
   * The command optional arguments if the interaction is a command.
   */
  readonly commandArguments?: Record<string, unknown>
}

export interface DiscordBotCommandHandler {
  /**
   * An instance of [SlashCommandBuilder](https://discordjs.guide/slash-commands/response-methods.html#command-response-methods) that defines how the command should be used.
   */
  readonly command: SlashCommandBuilder
  /**
   * Function that will be execute once the command is received with aditionnal data if needed.
   */
  readonly callback: (
    interaction: CommandInteraction,
    metadata?: InteractionMetadata,
  ) => void | Promise<void>
}

export interface DiscordBotButtonActionHandler {
  /**
   * Button name which is also present in the button's custom ID.
   */
  readonly name: string
  /**
   * Function that will be execute once the button is clicked with aditionnal data if needed.
   */
  readonly callback: (
    interaction: ButtonInteraction,
    metadata?: InteractionMetadata,
  ) => void | Promise<void>
}

export enum LogLevel {
  /**
   * Used when something doesn't behave as expected.
   */
  Error = 'error',
  /**
   *  Used when something is not critical but should be fixed.
   */
  Warn = 'warn',
  /**
   * Used when something should be kept track of.
   */
  Info = 'info',
  /**
   * Used mostly in development to track the flow of the application.
   */
  Debug = 'debug',
}
