import { describe, expect, test, beforeEach } from 'vitest'
import { MJPromptBuilder } from '../package'

const mjParams = {
  raw: { type: Boolean, default: false, short: '--raw' },
  profile: { type: String, default: '', short: '--p' },
  aspectRatio: { type: String, default: '1:1', short: '--ar' },
  stylize: { type: Number, default: 100, short: '--s' },
  version: { type: String, default: '7', short: '--v' },
  chaos: { type: Number, default: 0, short: '--c' },
}

describe('MJPromptBuilder', () => {
  let builder: MJPromptBuilder

  beforeEach(() => {
    builder = new MJPromptBuilder(mjParams)
  })

  test('creates prompt from string', () => {
    const promptStr = 'Airship battle --ar 9:16 --raw --p rtbkpdz --s 1000 --v 6.1 --c 50'
    builder.fromString(promptStr)

    expect(builder.toJSON()).toEqual({
      body: 'Airship battle',
      aspectRatio: '9:16',
      raw: true,
      profile: 'rtbkpdz',
      stylize: 1000,
      version: '6.1',
      chaos: 50,
    })
  })

  test('creates string from JSON object', () => {
    const promptObject = {
      body: 'Airship battle',
      aspectRatio: '9:16',
      raw: true,
      profile: 'rtbkpdz',
      stylize: 1000,
      version: '6.1',
      chaos: 50,
    }

    builder.fromJSON(promptObject)

    expect(builder.toString()).toBe('Airship battle --raw --p rtbkpdz --ar 9:16 --s 1000 --v 6.1 --c 50')
  })

  test('ensures fromString and toString are reversible', () => {
    const original = 'Epic landscape --ar 16:9 --s 500 --v 5.2'
    builder.fromString(original)
    const serialized = builder.toString()

    expect(serialized).toBe(original)
  })

  test('ensures fromJSON and toJSON are reversible', () => {
    const original = {
      body: 'Epic landscape',
      aspectRatio: '16:9',
      raw: false,
      profile: '',
      stylize: 500,
      version: '5.2',
      chaos: 0,
    }

    builder.fromJSON(original)
    const serialized = builder.toJSON()

    expect(serialized).toEqual(original)
  })

  test('handles missing optional parameters, but dont output them', () => {
    const minimalPrompt = 'Minimal prompt'
    builder.fromString(minimalPrompt)

    expect(builder.toJSON()).toEqual({
      body: 'Minimal prompt',
      aspectRatio: '1:1',
      raw: false,
      profile: '',
      stylize: 100,
      version: '7',
      chaos: 0,
    })

    expect(builder.toString()).toBe('Minimal prompt')
  })

  test('ignores unknown parameters gracefully', () => {
    const promptStr = 'Test --unknown param --ar 4:3'
    builder.fromString(promptStr)

    expect(builder.toJSON()).toEqual({
      body: 'Test',
      aspectRatio: '4:3',
      raw: false,
      profile: '',
      stylize: 100,
      version: '7',
      chaos: 0,
    })
  })
})
