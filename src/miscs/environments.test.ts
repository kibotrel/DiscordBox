import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  isDevelopmentEnvironment,
  isProductionEnvironment,
  isTestEnvironment,
} from './environments.js'

describe('isDevelopmentEnvironment', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("should return true if NODE_ENV is 'development'", () => {
    vi.stubEnv('NODE_ENV', 'development')
    expect(isDevelopmentEnvironment()).toBe(true)
  })

  it("should return false if NODE_ENV is 'production'", () => {
    vi.stubEnv('NODE_ENV', 'production')
    expect(isDevelopmentEnvironment()).toBe(false)
  })

  it("should return false if NODE_ENV is 'test'", () => {
    vi.stubEnv('NODE_ENV', 'test')
    expect(isDevelopmentEnvironment()).toBe(false)
  })

  it("should return false if NODE_ENV is ''", () => {
    vi.stubEnv('NODE_ENV', '')
    expect(isDevelopmentEnvironment()).toBe(false)
  })
})

describe('isProductionEnvironment', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("should return false if NODE_ENV is 'development'", () => {
    vi.stubEnv('NODE_ENV', 'development')
    expect(isProductionEnvironment()).toBe(false)
  })

  it("should return true if NODE_ENV is 'production'", () => {
    vi.stubEnv('NODE_ENV', 'production')
    expect(isProductionEnvironment()).toBe(true)
  })

  it("should return false if NODE_ENV is 'test'", () => {
    vi.stubEnv('NODE_ENV', 'test')
    expect(isProductionEnvironment()).toBe(false)
  })

  it("should return false if NODE_ENV is ''", () => {
    vi.stubEnv('NODE_ENV', '')
    expect(isProductionEnvironment()).toBe(false)
  })
})

describe('isTestEnvironment', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("should return false if NODE_ENV is 'development'", () => {
    vi.stubEnv('NODE_ENV', 'development')
    expect(isTestEnvironment()).toBe(false)
  })

  it("should return false if NODE_ENV is 'production'", () => {
    vi.stubEnv('NODE_ENV', 'production')
    expect(isTestEnvironment()).toBe(false)
  })

  it("should return true if NODE_ENV is 'test'", () => {
    vi.stubEnv('NODE_ENV', 'test')
    expect(isTestEnvironment()).toBe(true)
  })

  it("should return false if NODE_ENV is ''", () => {
    vi.stubEnv('NODE_ENV', '')
    expect(isTestEnvironment()).toBe(false)
  })
})
