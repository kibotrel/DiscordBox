import { describe, expect, it } from 'vitest'

import { codeBlock, generateCustomId, randomString } from './strings.js'

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

describe('generateCustomId', () => {
  it('should return a customId with uniqueId, actionName, previousRequestId and additionalData if all are given', () => {
    const customId = generateCustomId('foo', {
      previousRequestId: 'bar',
      additionalData: 'baz',
    })

    expect(customId.split(':').length).toBe(4)
    expect(customId.length).toBe(28)

    const [uniqueId, actionName, previousRequestId, additionalData] =
      customId.split(':')

    expect(uniqueId.length).toBe(16)
    expect(actionName).toBe('foo')
    expect(previousRequestId).toBe('bar')
    expect(additionalData).toBe('baz')
  })

  it('should return a customId with uniqueId and actionName if only actionName is given', () => {
    const customId = generateCustomId('foo')

    expect(customId.split(':').length).toBe(4)
    expect(customId.length).toBe(22)

    const [uniqueId, actionName, previousRequestId, additionalData] =
      customId.split(':')

    expect(uniqueId.length).toBe(16)
    expect(actionName).toBe('foo')
    expect(previousRequestId).toBe('')
    expect(additionalData).toBe('')
  })
})
