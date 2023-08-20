export const isDevelopmentEnvironment = () => {
  return process.env.NODE_ENV === 'development'
}

export const isProductionEnvironment = () => {
  return process.env.NODE_ENV === 'production'
}

export const isTestEnvironment = () => {
  return process.env.NODE_ENV === 'test'
}
