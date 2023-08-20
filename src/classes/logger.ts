import util from 'node:util'

import chalk from 'chalk'

import * as Misc from '../miscs/index.js'
import * as Types from '../types/index.js'

export class Logger {
  public readonly level: (typeof Types.LogLevel)[keyof typeof Types.LogLevel]
  public readonly isSilent: boolean

  constructor(
    config: {
      level?: (typeof Types.LogLevel)[keyof typeof Types.LogLevel]
      isSilent?: boolean
    } = {},
  ) {
    this.level = config.level ?? Types.LogLevel.Error
    this.isSilent = config.isSilent ?? false
  }

  private shouldLog(level: Types.LogLevel) {
    const threshold = Object.values(Types.LogLevel).indexOf(this.level)
    const requestedLevel = Object.values(Types.LogLevel).indexOf(level)

    return requestedLevel <= threshold
  }

  private prettyLevel(level: Types.LogLevel) {
    switch (level) {
      case Types.LogLevel.Debug: {
        return chalk.blue(Misc.capitalizeString(level))
      }

      case Types.LogLevel.Error: {
        return chalk.red(Misc.capitalizeString(level))
      }

      case Types.LogLevel.Info: {
        return chalk.green(Misc.capitalizeString(level))
      }

      case Types.LogLevel.Warn: {
        return chalk.yellow(Misc.capitalizeString(level))
      }
    }
  }

  private log(message: {
    level: (typeof Types.LogLevel)[keyof typeof Types.LogLevel]
    data: Record<string, unknown> | unknown[] | unknown
  }) {
    const { level, data } = message

    if (this.isSilent || !this.shouldLog(level)) {
      return
    }

    console.log(
      `[${this.getTimestamp({ color: true })}] ${this.prettyLevel(level)}: ${
        Misc.isObjectOrArray(data)
          ? util.inspect(data, { depth: undefined, colors: true })
          : data
      }`,
    )
  }

  public getTimestamp(options: { color?: boolean } = {}) {
    const timestamp = new Date().toISOString()

    return options.color ? chalk.magenta(timestamp) : timestamp
  }

  public debug(data: Record<string, unknown> | unknown[] | unknown) {
    this.log({ level: Types.LogLevel.Debug, data })
  }

  public error(data: Record<string, unknown> | unknown[] | unknown) {
    this.log({ level: Types.LogLevel.Error, data })
  }

  public info(data: Record<string, unknown> | unknown[] | unknown) {
    this.log({ level: Types.LogLevel.Info, data })
  }

  public warn(data: Record<string, unknown> | unknown[] | unknown) {
    this.log({ level: Types.LogLevel.Warn, data })
  }
}
