import { MJParamConfig } from "./types"

const params: MJParamConfig = {
  raw: { type: Boolean, default: false, short: '--raw' },
  draft: { type: Boolean, default: false, short: '--draft' },
  profile: { type: String, default: '', short: '--p' },
  ar: { type: String, default: '1:1', short: '--ar' },
  stylize: { type: Number, default: 100, short: '--s' },
  version: { type: String, default: '7', short: '--v' },
  chaos: { type: Number, default: 0, short: '--c' },
}

export default params