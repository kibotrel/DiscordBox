/**
 * Check if the current environment is development.
 * @returns whether the current environment is development.
 */
export const isDevelopmentEnvironment = () => {
  return process.env.NODE_ENV === 'development'
}

/**
 * Check if the current environment is production.
 * @returns whether the current environment is production.
 */
export const isProductionEnvironment = () => {
  return process.env.NODE_ENV === 'production'
}

/**
 * Check if the current environment is test.
 * @returns whether the current environment is test.
 */
export const isTestEnvironment = () => {
  return process.env.NODE_ENV === 'test'
}
