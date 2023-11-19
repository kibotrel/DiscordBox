/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable no-empty-function */

import { describe, expect, it } from 'vitest'

import { isObjectOrArray } from './checks.js'

describe('isObjectOrArray', () => {
  it('should return true if input is array (empty)', () => {
    expect(isObjectOrArray([])).toBe(true)
  })

  it('should return true if input is array (filled)', () => {
    expect(isObjectOrArray([1, 2, 3])).toBe(true)
  })

  it('should return true if input is object (empty)', () => {
    expect(isObjectOrArray({})).toBe(true)
  })

  it('should return true if input is object (filled)', () => {
    expect(isObjectOrArray({ a: 1, b: 2, c: 3 })).toBe(true)
  })

  it('should return true if input is a date', () => {
    expect(isObjectOrArray(new Date())).toBe(true)
  })

  it('should return true if input is an error', () => {
    expect(isObjectOrArray(new Error('test'))).toBe(true)
  })

  it('should return true if input is a regexp', () => {
    expect(isObjectOrArray(/test/)).toBe(true)
  })

  it('should return false if input is null', () => {
    expect(isObjectOrArray(null)).toBe(false)
  })

  it('should return false if input is undefined', () => {
    expect(isObjectOrArray(undefined)).toBe(false)
  })

  it('should return false if input is boolean', () => {
    expect(isObjectOrArray(true)).toBe(false)
  })

  it('should return false if input is number (integer)', () => {
    expect(isObjectOrArray(1)).toBe(false)
  })

  it('should return false if input is number (float)', () => {
    expect(isObjectOrArray(1.1)).toBe(false)
  })

  it('should return false if input is string (empty)', () => {
    expect(isObjectOrArray('a')).toBe(false)
  })

  it('should return false if input is string (filled)', () => {
    expect(isObjectOrArray('abc')).toBe(false)
  })

  it('should return false if input is symbol', () => {
    expect(isObjectOrArray(Symbol('a'))).toBe(false)
  })

  it('should return false if input is function', () => {
    expect(isObjectOrArray(() => {})).toBe(false)
  })

  it('should return false if input is bigint', () => {
    expect(isObjectOrArray(BigInt(1))).toBe(false)
  })
})
