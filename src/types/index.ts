import type DiscordJS from 'discord.js'

export interface EventHandler<
  Type extends keyof DiscordJS.ClientEvents = keyof DiscordJS.ClientEvents,
> {
  /**
   * Must be one of [Discord.js handled events](https://old.discordjs.dev/#/docs/discord.js/main/typedef/Events).
   */
  readonly name: Type
  /**
   * Function that will be execute once the event is received with aditionnal data if needed.
   */
  readonly callback: (
    ...parameters: DiscordJS.ClientEvents[Type]
  ) => void | Promise<void>
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
  /**
   * Action name if the interaction is a button.
   */
  readonly actionName?: string
  readonly selectedOptions?: string[]
}

export type InteractionTypes =
  | DiscordJS.CommandInteraction
  | DiscordJS.ButtonInteraction
  | DiscordJS.StringSelectMenuInteraction
  | DiscordJS.UserSelectMenuInteraction
  | DiscordJS.RoleSelectMenuInteraction
  | DiscordJS.MentionableSelectMenuInteraction
  | DiscordJS.ChannelSelectMenuInteraction

export interface InteractionHandler<
  InteractionType extends InteractionTypes = InteractionTypes,
> {
  /**
   * An instance of [SlashCommandBuilder](https://discordjs.guide/slash-commands/response-methods.html#command-response-methods) if the interaction is a command.
   */
  readonly action: DiscordJS.SlashCommandBuilder | string
  /**
   * Function that will be execute once the command is received with aditionnal data if needed.
   */
  readonly callback: (
    interaction: InteractionType,
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
