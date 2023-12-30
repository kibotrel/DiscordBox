/**
 * Converts an object with snake_case keys to an object with camelCase keys.
 */
export const objectWithCamelCaseKeys = <OutputObject>(
  object: Record<string, unknown> | undefined | null,
): OutputObject | undefined => {
  if (!object) {
    return undefined
  }

  const entries = Object.entries(object)
  const camelCaseEntries = entries.map(([key, value]) => {
    const camelCaseKey = key.replaceAll(/_([\da-z])/g, (_, letter) => {
      return letter.toUpperCase()
    })

    return [camelCaseKey, value]
  })

  return Object.fromEntries(camelCaseEntries)
}
