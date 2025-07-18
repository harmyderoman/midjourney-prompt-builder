# Midjourney Prompt Builder

A simple tool to help you build and parse prompts for MidJourney.

## Features

- Easy prompt creation
- Customizable options
- Parameters validation

## Installation

```bash
npm install mjpb
```

## Usage

### Parse prompts:

```ts
import { MJPromptBuilder } from 'mjpb'

const builder = new MJPromptBuilder()

const prompt = 'A photo of a steampunk airship with white sails is firing at a pirate airship with black sails, above the clouds. Hyperrealistic --ar 9:16 --raw --profile rtbkpdz --stylize 1000 --v 6.1'
builder.fromString(prompt)

const promptJSON = builder.toJSON()
// You will get 
// {
//   body: 'A photo of a steampunk airship with white sails is firing at a pirate airship with black sails, above the clouds. Hyperrealistic',
//   aspectRatio: '9:16',
//   raw: true,
//   profile: 'rtbkpdz',
//   stylize: '1000',
//   version: '6.1'
// }
```
### Validate params

```ts
import { MJPromptBuilder } from 'mjpb'

const tester = new MJPromptBuilder()

const isArValid = tester.validateOption('ar', '16:9') // true
const isExpValid = tester.validateOption('exp', 350) // false
const isStylizeValid = tester.validateOption('stylize', 1000) // true
```

## License

MIT