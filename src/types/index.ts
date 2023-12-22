import type DiscordJS from 'discord.js'

export interface EventHandler<
  Type extends keyof DiscordJS.ClientEvents = keyof DiscordJS.ClientEvents,
> {
  /**
   * Must be one of [Discord.js handled events](https://old.discordjs.dev/#/docs/discord.js/main/typedef/Events).
   */
  readonly name: Type
  readonly callback: (
    ...parameters: DiscordJS.ClientEvents[Type]
  ) => void | Promise<void>
  readonly once?: boolean
}

export interface InteractionMetadata {
  readonly channelId: string
  readonly requestId: string
  readonly userId: string
  readonly actionName?: string
  readonly additionalData?: string
  readonly commandArguments?: Record<string, unknown>
  readonly commandName?: string
  readonly messageId?: string
  readonly modalFields?: DiscordJS.Collection<string, string>
  readonly previousRequestId?: string
  readonly selectedOptions?: string[]
}

export type InteractionTypes =
  | DiscordJS.ButtonInteraction
  | DiscordJS.ChannelSelectMenuInteraction
  | DiscordJS.CommandInteraction
  | DiscordJS.MentionableSelectMenuInteraction
  | DiscordJS.ModalSubmitInteraction
  | DiscordJS.RoleSelectMenuInteraction
  | DiscordJS.StringSelectMenuInteraction
  | DiscordJS.UserSelectMenuInteraction

export interface InteractionHandler<
  InteractionType extends InteractionTypes = InteractionTypes,
> {
  /**
   * An instance of [SlashCommandBuilder](https://discordjs.guide/slash-commands/response-methods.html#command-response-methods) if the interaction is a command.
   */
  readonly action:
    | Omit<
        DiscordJS.SlashCommandBuilder,
        'addSubcommand' | 'addSubcommandGroup'
      >
    | string
  callback(
    interaction: InteractionType,
    metadata?: InteractionMetadata,
  ): void | Promise<void>
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

export interface CustomIdParts {
  readonly actionName: string
  readonly uniqueId?: string
  readonly previousRequestId?: string
  readonly additionalData?: string
}
