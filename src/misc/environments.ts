/**
 * Check if the current environment is development.
 */
export const isDevelopmentEnvironment = process.env.NODE_ENV === 'development'

/**
 * Check if the current environment is production.
 */
export const isProductionEnvironment = process.env.NODE_ENV === 'production'

/**
 * Check if the current environment is test.
 */
export const isTestEnvironment = process.env.NODE_ENV === 'test'
