import chalk from 'chalk'

export const capitalizeString = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const pluralizeString = (options: {
  count: number
  singular: string
  plural?: string
}) => {
  const plural = options.plural ?? `${options.singular}s`

  return options.count === 1
    ? `${options.count} ${options.singular}`
    : `${options.count.toLocaleString('en-US')} ${plural}`
}

/**
 * Transform a variable into a colored type based string.
 */
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

/**
 * Transform array of strings into a human readable list.
 */
export const prettifyList = (list: readonly string[]) => {
  const formatter = new Intl.ListFormat('en-GB', {
    style: 'long',
    type: 'conjunction',
  })

  return formatter.format(list)
}
