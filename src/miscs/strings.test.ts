import { describe, expect, it } from 'vitest'

import { codeBlock, randomString } from './strings.js'

describe('randomString', () => {
  it('should return a string of length 16 if no length is specified', () => {
    expect(randomString().length).toBe(16)
  })

  it('should return a string of specified length', () => {
    expect(randomString(64).length).toBe(64)
  })

  it('should return a string of length 0 if length is 0', () => {
    expect(randomString(0).length).toBe(0)
  })

  it('should throw a RangeError if length is negative', () => {
    expect(() => {
      return randomString(-1)
    }).toThrow(RangeError)
  })
})

describe('codeBlock', () => {
  it('should return a Markdown code block string', () => {
    expect(codeBlock('foo')).toBe('```\nfoo\n```')
  })

  it('should return a Markdown code block string with specified language', () => {
    expect(codeBlock('foo', 'bar')).toBe('```bar\nfoo\n```')
  })
})
