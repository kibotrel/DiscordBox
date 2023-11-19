/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable unicorn/no-null */

import { describe, expect, it } from 'vitest'

import {
  capitalizeString,
  humanReadableList,
  pluralizeString,
  prettifyVariable,
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

describe('prettifyVariable', () => {
  it('should return a green string if the variable is a string', () => {
    expect(prettifyVariable('test')).toBe("\u001B[32m'test'\u001B[39m")
  })

  it('should return a yellow string if the variable is a number', () => {
    expect(prettifyVariable(1)).toBe('\u001B[33m1\u001B[39m')
  })

  it('should return a cyan string if the variable is a boolean', () => {
    expect(prettifyVariable(true)).toBe('\u001B[36mtrue\u001B[39m')
  })

  it('should return a gray string if the variable is undefined', () => {
    expect(prettifyVariable(undefined)).toBe('\u001B[90mundefined\u001B[39m')
  })

  it('should return a gray string if the variable is null', () => {
    expect(prettifyVariable(null)).toBe('\u001B[90mnull\u001B[39m')
  })

  it('should return a gray string if the variable is an object', () => {
    expect(prettifyVariable({})).toBe('\u001B[90m[object Object]\u001B[39m')
  })

  it('should return a gray string if the variable is an array', () => {
    expect(prettifyVariable([1, 2])).toBe('\u001B[90m1,2\u001B[39m')
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
