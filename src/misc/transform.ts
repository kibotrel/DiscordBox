import chalk from 'chalk'

/**
 * Capitalizes the first letter of a string.
 * @param string - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalizeString = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

export interface PluralizeStringOptions {
  /**
   * The number of items.
   */
  readonly count: number
  /**
   *  The singular form of the word.
   */
  readonly singular: string
  /**
   *  The optional plural form of the word if it's irregular.
   */
  readonly plural?: string
}

export const pluralizeString = (options: PluralizeStringOptions) => {
  const plural = options.plural ?? `${options.singular}s`

  return options.count === 1
    ? `${options.count} ${options.singular}`
    : `${options.count.toLocaleString('en-US')} ${plural}`
}

export const prettifyVariable = (
  variable: string | number | boolean | undefined,
) => {
  switch (typeof variable) {
    case 'string': {
      return chalk.green(`'${variable}'`)
    }

    case 'number': {
      return chalk.yellow(variable)
    }

    case 'boolean': {
      return chalk.cyan(variable)
    }

    default: {
      return chalk.gray(variable)
    }
  }
}

export const prettifyList = (list: readonly string[]) => {
  const formatter = new Intl.ListFormat('en-GB', {
    style: 'long',
    type: 'conjunction',
  })

  return formatter.format(list)
}
