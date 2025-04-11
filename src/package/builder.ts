
export class MJPromptBuilder {
  [x: string]: any

}

const builder = new MJPromptBuilder()

const prompt = 'A photo of a steampunk airship with white sails is firing at a pirate airship with black sails, above the clouds. Hyperrealistic --ar 9:16 --raw --profile rtbkpdz --stylize 1000 --v 6.1'
builder.fromString(prompt)

const promptObject = {
  body: 'A photo of a steampunk airship with white sails is firing at a pirate airship with black sails, above the clouds. Hyperrealistic',
  aspectRatio: '9:16',
  raw: true,
  profile: 'rtbkpdz',
  stylize: '1000',
  version: '6.1'
}

console.log(JSON.stringify(promptObject) === JSON.stringify(builder.toJSON())) // true

const builder2 = new MJPromptBuilder()
builder2.fromJSON(promptObject)

console.log(prompt === builder2.toString()) // true

const mjParams = {
  raw: {
    type: Boolean,
    default: false,
    short: '--raw'
  },
  profile: {
    type: String,
    default: '',
    short: '--p'
  },
  aspectRatio: {
    type: String,
    default: '1:1',
    short: '--ar'
  },
  stylize: {
    type: Number,
    default: 100,
    short: '--s'
  },
  version: {
    type: String,
    default: '7',
    short: '--v'
  },
  chaos: {
    type: Number,
    default: 0,
    short: '--c'
  },
}

console.log(mjParams)

