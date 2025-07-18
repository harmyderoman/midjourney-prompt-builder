import { describe, expect, test, beforeEach, vi } from 'vitest'
import { MJPromptBuilder } from '../package'

vi.mock('./../package/parameters.js', () => {
  return {
    default: { 
      '6.1': {
        no: { 
          type: String, 
          default: '', 
          short: '--no',
          validate: (val: string) => val.length > 0
        },
        chaos: { 
          type: Number, 
          default: 0, 
          short: '--c',
          validate: (val: number) => val >= 0 && val <= 100
        },
        ar: { 
          type: String, 
          default: '1:1', 
          short: '--ar',
          validate: (val: string) => /^\d+:\d+$/.test(val)
        },
        raw: { type: Boolean, default: false, short: '--raw' },
        profile: { 
          type: String, 
          default: '', 
          short: '--p',
          validate: (val: string) => /^[a-zA-Z0-9-_]+$/.test(val)
        },
        stylize: { 
          type: Number, 
          default: 100, 
          short: '--s',
          validate: (val: number) => val >= 0 && val <= 1000
        },
        version: { 
          type: String, 
          default: '7', 
          short: '--v',
          validate: (val: string) => /^\d+(\.\d+)?$/.test(val)
        },
      }
    },
  }
})

describe('MJPromptBuilder', () => {
  let builder: MJPromptBuilder

  beforeEach(() => {
    builder = new MJPromptBuilder()
  })

  test('creates prompt from string', () => {
    const promptStr = 'Airship battle --ar 9:16 --raw --p rtbkpdz --s 1000 --v 6.1 --c 50'
    builder.fromString(promptStr)

    expect(builder.toJSON(true)).toEqual({
      body: 'Airship battle',
      chaos: 50,
      ar: '9:16',
      raw: true,
      profile: 'rtbkpdz',
      stylize: 1000,
      version: '6.1',
    })
  })

  test('creates string from JSON object', () => {
    const promptObject = {
      body: 'Airship battle',
      chaos: 50,
      ar: '9:16',
      raw: true,
      profile: 'rtbkpdz',
      stylize: 1000,
      version: '6.1',
    }

    builder.fromJSON(promptObject)

    expect(builder.toString(true)).toBe('Airship battle --c 50 --ar 9:16 --raw --p rtbkpdz --s 1000 --v 6.1')
  })

  test('ensures fromString and toString are reversible', () => {
    const original = 'Epic landscape --ar 16:9 --s 500 --v 6.1'
    builder.fromString(original)
    const serialized = builder.toString()

    expect(serialized).toBe(original)
  })

  test('ensures fromJSON and toJSON are reversible', () => {
    const original = {
      body: 'Epic landscape',
      ar: '16:9',
      raw: false,
      profile: '',
      stylize: 500,
      version: '6.1',
      chaos: 0,
    }

    builder.fromJSON(original)
    const serialized = builder.toJSON()

    expect(serialized).toEqual(original)
  })

  test('handles missing optional parameters, but dont output them', () => {
    const minimalPrompt = 'Minimal prompt'
    builder.fromString(minimalPrompt)

    expect(builder.toJSON(true)).toEqual({
      body: 'Minimal prompt',
    })

    expect(builder.toString()).toBe('Minimal prompt')
  })

  test('ignores unknown parameters gracefully', () => {
    const promptStr = 'Test --unknown param --ar 4:3 --v 6.1'
    builder.fromString(promptStr)

    expect(builder.toJSON()).toEqual({
      body: 'Test',
      ar: '4:3',
      raw: false,
      profile: '',
      stylize: 100,
      version: '6.1',
      chaos: 0,
      no: ''
    })
  })

  test('method validateOption', () => {
    builder.fromJSON({
      body: 'Default test',
      ar: '1:1',
      raw: false,
      profile: '',
      stylize: 100,
      version: '6.1',
      chaos: 0,
      no: ''
    })
    // Test valid values
    expect(builder.validateOption('ar', '16:9')).toBe(true)
    expect(builder.validateOption('chaos', 50)).toBe(true)
    expect(builder.validateOption('profile', 'valid-profile_123')).toBe(true)
    expect(builder.validateOption('stylize', 1000)).toBe(true)
    expect(builder.validateOption('version', '6.1')).toBe(true)
    expect(builder.validateOption('no', 'something')).toBe(true)

    // Test invalid values
    expect(builder.validateOption('ar', 'invalid')).toBe(false)
    expect(builder.validateOption('chaos', -1)).toBe(false)
    expect(builder.validateOption('profile', 'invalid profile!')).toBe(false)
    expect(builder.validateOption('stylize', 2000)).toBe(false)
    expect(builder.validateOption('version', 'abc')).toBe(false)
    expect(builder.validateOption('no', '')).toBe(false)

    // Unknown option should return false or throw
    // expect(() => builder.validateOption('unknown', 'value')).toThrow()
  })

  test('toString omits default values', () => {
    builder.fromJSON({
      body: 'Default test',
      ar: '1:1',
      raw: false,
      profile: '',
      stylize: 100,
      version: '7',
      chaos: 0,
      no: ''
    })
    expect(builder.toString()).toBe('Default test')
  })

  test('toJSON returns all values when not omitting defaults', () => {
    builder.fromString('Test --ar 4:3 --v 6.1')
    expect(builder.toJSON(false)).toEqual({
      body: 'Test',
      ar: '4:3',
      raw: false,
      profile: '',
      stylize: 100,
      version: '6.1',
      chaos: 0,
      no: ''
    })
  })

  test('fromString ignores extra spaces and formats correctly', () => {
    builder.fromString('  Airship   --ar   9:16   --v 6.1   ')
    expect(builder.toJSON(true)).toEqual({
      body: 'Airship',
      ar: '9:16',
      version: '6.1'
    })
    expect(builder.toString(true)).toBe('Airship --ar 9:16 --v 6.1')
  })
})
