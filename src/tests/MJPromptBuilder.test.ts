import { describe, expect, test, beforeEach, vi } from 'vitest'
import { MJPromptBuilder } from '../package'

vi.mock('./../package/parameters.js', () => {
  return {
    default: { '6.1' :{
      no: { type: String, default: '', short: '--no' },
      chaos: { type: Number, default: 0, short: '--c' },
      ar: { type: String, default: '1:1', short: '--ar' },
      raw: { type: Boolean, default: false, short: '--raw' },
      profile: { type: String, default: '', short: '--p' },
      stylize: { type: Number, default: 100, short: '--s' },
      version: { type: String, default: '', short: '--v' },
    }},
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
})
