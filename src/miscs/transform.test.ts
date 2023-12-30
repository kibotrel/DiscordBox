/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable unicorn/no-null */

import { describe, expect, it } from 'vitest'

import {
  capitalizeString,
  humanReadableList,
  millisecondsToTimeString,
  pluralizeString,
} from './transform.js'

describe('capitalizeString', () => {
  it('should return the input if already capitalized', () => {
    expect(capitalizeString('Test')).toBe('Test')
  })

  it('should capitalize the first letter of the input', () => {
    expect(capitalizeString('test')).toBe('Test')
  })

  it('should capitalize the first letter of the input and lowercase the rest', () => {
    expect(capitalizeString('TEST')).toBe('Test')
  })

  it('should return an empty string if the input is an empty string', () => {
    expect(capitalizeString('')).toBe('')
  })
})

describe('pluralizeString', () => {
  it('should return the singular form if the count is 1', () => {
    expect(pluralizeString({ count: 1, singular: 'test' })).toBe('1 test')
  })

  it('should return the plural form if the count is not 1', () => {
    expect(pluralizeString({ count: 2, singular: 'test' })).toBe('2 tests')
  })

  it('should return the plural form if the count is not 1 and the plural form is provided', () => {
    expect(
      pluralizeString({ count: 2, singular: 'child', plural: 'children' }),
    ).toBe('2 children')
  })

  it('should return the singular form if the count is 1 and the plural form is provided', () => {
    expect(
      pluralizeString({ count: 1, singular: 'child', plural: 'children' }),
    ).toBe('1 child')
  })

  it('should return the singular form if the count is 1 and the plural form is not provided', () => {
    expect(pluralizeString({ count: 1, singular: 'child' })).toBe('1 child')
  })

  it('should throw a RangeError if the count is negative', () => {
    expect(() => {
      pluralizeString({ count: -1, singular: 'test' })
    }).toThrow(RangeError)
  })
})

describe('humanReadableList', () => {
  it('should return string with conjunction if two items in input list', () => {
    expect(humanReadableList(['test', 'test'])).toBe('test and test')
  })

  it('should return string with comma and conjunction if more than two itemps in input list', () => {
    expect(humanReadableList(['test', 'test', 'test'])).toBe(
      'test, test and test',
    )
  })

  it("should return '' if the list is empty", () => {
    expect(humanReadableList([])).toBe('')
  })
})

describe('millisecondsToTimeString', () => {
  it('should return time in days if input more than a day', () => {
    expect(millisecondsToTimeString(372_577_688)).toBe('4d 7h 29min 37s 688ms')
    expect(millisecondsToTimeString(86_400_000)).toBe('1d')
    expect(millisecondsToTimeString(622_800_000)).toBe('7d 5h')
    expect(millisecondsToTimeString(608_040_000)).toBe('7d 54min')
    expect(millisecondsToTimeString(604_812_000)).toBe('7d 12s')
    expect(millisecondsToTimeString(604_800_123)).toBe('7d 123ms')
    expect(millisecondsToTimeString(1_000_000_000)).toBe('11d 13h 46min 40s')
    expect(millisecondsToTimeString(999_960_051)).toBe('11d 13h 46min 51ms')
    expect(millisecondsToTimeString(997_240_222)).toBe('11d 13h 40s 222ms')
    expect(millisecondsToTimeString(953_200_981)).toBe('11d 46min 40s 981ms')
  })

  it('should return time in hours if input is less than a day', () => {
    expect(millisecondsToTimeString(5_532_532)).toBe('1h 32min 12s 532ms')
    expect(millisecondsToTimeString(3_600_000)).toBe('1h')
    expect(millisecondsToTimeString(7_380_000)).toBe('2h 3min')
    expect(millisecondsToTimeString(3_658_000)).toBe('1h 58s')
    expect(millisecondsToTimeString(3_600_123)).toBe('1h 123ms')
    expect(millisecondsToTimeString(64_320_027)).toBe('17h 52min 27ms')
    expect(millisecondsToTimeString(43_206_271)).toBe('12h 6s 271ms')
  })

  it('should return time in minutes if input is less than an hour', () => {
    expect(millisecondsToTimeString(123_456)).toBe('2min 3s 456ms')
    expect(millisecondsToTimeString(60_000)).toBe('1min')
    expect(millisecondsToTimeString(247_000)).toBe('4min 7s')
    expect(millisecondsToTimeString(180_032)).toBe('3min 32ms')
  })

  it('should return time in seconds if input is less than a minute', () => {
    expect(millisecondsToTimeString(23_643)).toBe('23s 643ms')
    expect(millisecondsToTimeString(1000)).toBe('1s')
  })

  it('should return time in milliseconds if input is less than a second', () => {
    expect(millisecondsToTimeString(643)).toBe('643ms')
  })

  it('should return time in milliseconds if input is 0', () => {
    expect(millisecondsToTimeString(0)).toBe('0ms')
  })

  it('should throw a RangeError if the input is negative', () => {
    expect(() => {
      millisecondsToTimeString(-1)
    }).toThrow(RangeError)
  })
})
