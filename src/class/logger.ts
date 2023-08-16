import util from 'node:util'

import chalk from 'chalk'

import { capitalizeString, isObjectOrArray } from '../misc/index.js'
import { LogLevel } from '../types/index.js'

export type LogData = unknown | unknown[] | Record<string, unknown>

export interface LogMessage {
  /**
   * Must be one of supported {@link LogLevel}.
   */
  readonly level: (typeof LogLevel)[keyof typeof LogLevel]
  /**
   *  Message to log.
   */
  readonly data: LogData
}

export interface GetTimestampParameters {
  /**
   *  Should the timestamp be colored?
   */
  readonly color?: boolean
}

export interface LoggerParameters {
  /**
   *  Criticity level from which the logger will log.
   */
  readonly level?: (typeof LogLevel)[keyof typeof LogLevel]
  /**
   *  Weither or not the logger should log in the console.
   */
  readonly isSilent?: boolean
}

export class Logger {
  /**
   *  Criticity level from which the logger will log.
   */
  public readonly level: (typeof LogLevel)[keyof typeof LogLevel]
  /**
   *  Weither or not the logger should log in the console.
   */
  public readonly isSilent: boolean

  constructor(config: LoggerParameters) {
    this.level = config.level ?? LogLevel.Error
    this.isSilent = config.isSilent ?? false
  }

  /**
   * Check if the logger should log the given level.
   * @param level - Level to check.
   * @returns `true` if the logger should log the given level, `false` otherwise.
   */
  private shouldLog(level: LogLevel) {
    const threshold = Object.values(LogLevel).indexOf(this.level)
    const requestedLevel = Object.values(LogLevel).indexOf(level)

    return requestedLevel <= threshold
  }

  /**
   * Pretty print the given level by adding colors and capitalizing it.
   * @param level - Level to pretty print.
   * @returns Pretty printed level.
   */
  private prettyLevel(level: LogLevel) {
    switch (level) {
      case LogLevel.Debug: {
        return chalk.blue(capitalizeString(level))
      }

      case LogLevel.Error: {
        return chalk.red(capitalizeString(level))
      }

      case LogLevel.Info: {
        return chalk.green(capitalizeString(level))
      }

      case LogLevel.Warn: {
        return chalk.yellow(capitalizeString(level))
      }
    }
  }

  /**
   * Internal log function. Will log the given data if the logger is not silent and if the level is high enough.
   * @param message - Contains the `level` and the `data` to log.
   */
  private log(message: LogMessage) {
    const { level, data } = message

    if (this.isSilent || !this.shouldLog(level)) {
      return
    }

    console.log(
      `[${this.getTimestamp({ color: true })}] ${this.prettyLevel(level)}: ${
        isObjectOrArray(data)
          ? util.inspect(data, { depth: undefined, colors: true })
          : data
      }`,
    )
  }

  /**
   * Get the current timestamp.
   * @param options - Options to customize the timestamp.
   * @returns Current timestamp as an ISO string.
   */
  public getTimestamp(options?: GetTimestampParameters) {
    const timestamp = new Date().toISOString()

    return options?.color ? chalk.magenta(timestamp) : timestamp
  }

  /**
   * Log the given data as a debug message.
   * @param data - Data to log.
   */
  public debug(data: LogData) {
    this.log({ level: LogLevel.Debug, data })
  }

  /**
   * Log the given data as an error message.
   * @param data - Data to log.
   */
  public error(data: LogData) {
    this.log({ level: LogLevel.Error, data })
  }

  /**
   * Log the given data as an info message.
   * @param data - Data to log.
   */
  public info(data: LogData) {
    this.log({ level: LogLevel.Info, data })
  }

  /**
   * Log the given data as a warning message.
   * @param data - Data to log.
   */
  public warn(data: LogData) {
    this.log({ level: LogLevel.Warn, data })
  }
}
