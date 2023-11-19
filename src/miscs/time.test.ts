import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { getCurrentTimestamp } from './time.js'

describe('getCurrentTimestamp', () => {
  const mockDate = new Date(2023, 11, 27)

  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should return the current timestamp as ISO string', () => {
    expect(getCurrentTimestamp()).toBe(mockDate.toISOString())
  })
})
