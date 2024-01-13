import { describe, expect, it } from 'vitest'

import { objectWithCamelCaseKeys } from './objects.js'

describe('objectWithCamelCaseKeys', () => {
  it('should convert snake case keys into camel cases', () => {
    const snakeCaseObject = {
      snake_case_key: 'snake_case_value',
      snake_case_key_2: 'snake_case_value_2',
    }

    expect(objectWithCamelCaseKeys(snakeCaseObject)).toEqual({
      snakeCaseKey: 'snake_case_value',
      snakeCaseKey2: 'snake_case_value_2',
    })
  })

  it('should return undefined if the input is undefined', () => {
    const object = undefined

    expect(objectWithCamelCaseKeys(object)).toEqual(undefined)
  })

  it('should return undefined if the input is null', () => {
    /* eslint-disable-next-line unicorn/no-null */
    const object = null

    expect(objectWithCamelCaseKeys(object)).toEqual(undefined)
  })

  it('should return empty object if the input is empty object', () => {
    const object = {}

    expect(objectWithCamelCaseKeys(object)).toEqual({})
  })
})
