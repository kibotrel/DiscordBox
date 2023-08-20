export const isObjectOrArray = (value: unknown) => {
  return (typeof value === 'object' || Array.isArray(value)) && value !== null
}
