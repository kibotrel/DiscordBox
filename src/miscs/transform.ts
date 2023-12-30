import chalk from 'chalk'

/*
 * Makes the first letter of a string uppercase and the rest lowercase
 */
export const capitalizeString = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase()
}

/*
 * Handles pluralization of a string based on a count
 */
export const pluralizeString = (options: {
  count: number
  singular: string
  plural?: string
}) => {
  const plural = options.plural ?? `${options.singular}s`

  if (options.count < 0) {
    throw new RangeError('Count cannot be negative')
  }

  return options.count === 1
    ? `${options.count} ${options.singular}`
    : `${options.count.toLocaleString('en-US')} ${plural}`
}

export const prettifyVariable = (variable: unknown) => {
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

export const humanReadableList = (list: readonly string[]) => {
  const formatter = new Intl.ListFormat('en-GB', {
    style: 'long',
    type: 'conjunction',
  })

  return formatter.format(list)
}

export const prettifyArray = (
  array: ReadonlyArray<string | number | boolean | undefined>,
) => {
  return humanReadableList(
    array.map((value) => {
      return prettifyVariable(value)
    }),
  )
}

export const prettifyObject = (
  object: Record<string, string | number | boolean | undefined>,
) => {
  return humanReadableList(
    Object.entries(object).map(([key, value]) => {
      return `${key}: ${prettifyVariable(value)}`
    }),
  )
}

/*
 * Converts time expressed in milliseconds to a human-readable string
 */
export const millisecondsToTimeString = (milliseconds: number) => {
  if (milliseconds < 0) {
    throw new RangeError('Time cannot be negative')
  }

  const steps = [
    { unit: 'd', divisor: 86_400_000, modulus: 0 },
    { unit: 'h', divisor: 3_600_000, modulus: 24 },
    { unit: 'min', divisor: 60_000, modulus: 60 },
    { unit: 's', divisor: 1000, modulus: 60 },
    { unit: 'ms', divisor: 1, modulus: 1000 },
  ]
  let timeString = ''

  for (const { unit, divisor, modulus } of steps) {
    const value = modulus
      ? Math.floor(milliseconds / divisor) % modulus
      : Math.floor(milliseconds / divisor)

    timeString += value > 0 ? `${value}${unit} ` : ''
  }

  return timeString.trim() || '0ms'
}
