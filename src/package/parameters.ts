import { MJParamConfig } from "./types"

const v6 = {
  quality: { 
    type: Number, 
    default: 1, 
    short: '--q',
    validate: (val: number) => [1, 2, 4].includes(val)
  },
  no: { 
    type: String, 
    default: '', 
    short: '--no',
    validate: (val: string) => val.length > 0
  },
  stop: { 
    type: Number, 
    default: 100, 
    short: '--stop',
    validate: (val: number) => val >= 0 && val <= 100
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
  style: { 
    type: String, 
    default: 'standart', 
    short: '--style',
    validate: (val: string) => ['raw', 'standart', 'expressive'].includes(val)
  },
  raw: { 
    type: Boolean, 
    default: false, 
    short: '--raw' 
  },
  cref: { 
    type: String, 
    default: '', 
    short: '--cref',
    validate: (val: string) => val.trim().length > 0
  },
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
  weird: { 
    type: Number, 
    default: 0, 
    short: '--w',
    validate: (val: number) => val >= 0 && val <= 3000
  },
  version: { 
    type: String, 
    default: '7', 
    short: '--v',
    validate: (val: string) => ['5', '5.1', '5.2', '6', '6.1', '7'].includes(val)
  },
  repeat: { 
    type: Number, 
    default: 1, 
    short: '--r',
    validate: (val: number) => Number.isInteger(val) && val >= 1 && val <= 100
  },
  seed: { 
    type: Number, 
    default: 0, 
    short: '--seed',
    validate: (val: number) => Number.isInteger(val) && val >= 0
  },
  sref: { 
    type: String, 
    default: '', 
    short: '--sref',
    validate: (val: string) => val.trim().length > 0
  },
  tile: { 
    type: Boolean, 
    default: false, 
    short: '--tile' 
  },
  video: { 
    type: Boolean, 
    default: false, 
    short: '--video' 
  },
  fast: { 
    type: Boolean, 
    default: false, 
    short: '--fast' 
  },
  iw: { 
    type: Number, 
    default: 0.25, 
    short: '--iw',
    validate: (val: number) => val >= 0 && val <= 5
  },
  relax: { 
    type: Boolean, 
    default: false, 
    short: '--relax' 
  },
  turbo: { 
    type: Boolean, 
    default: false, 
    short: '--turbo' 
  },
  niji: { 
    type: String, 
    default: '6', 
    short: '--niji',
    validate: (val: string) => ['5', '6'].includes(val)
  },
  stealth: { 
    type: Boolean, 
    default: false, 
    short: '--stealth' 
  },
  public: { 
    type: Boolean, 
    default: false, 
    short: '--public' 
  },
  oref: { 
    type: String, 
    default: '', 
    short: '--oref',
    validate: (val: string) => val.trim().length > 0
  },
  ow: { 
    type: Number, 
    default: 0, 
    short: '--ow',
    validate: (val: number) => val >= 0 && val <= 1000
  },
}

const params: Record<string, MJParamConfig> = {
  '7': {
  quality: { 
    type: Number, 
    default: 1, 
    short: '--q',
    validate: (val: number) => [1, 2, 4].includes(val)
  },
  no: { 
    type: String, 
    default: '', 
    short: '--no',
    validate: (val: string) => val.length > 0
  },
  stop: { 
    type: Number, 
    default: 100, 
    short: '--stop',
    validate: (val: number) => val >= 0 && val <= 100
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
  style: { 
    type: String, 
    default: 'standart', 
    short: '--style',
    validate: (val: string) => ['raw', 'standart', 'expressive'].includes(val)
  },
  raw: { 
    type: Boolean, 
    default: false, 
    short: '--raw' 
  },
  cref: { 
    type: String, 
    default: '', 
    short: '--cref',
    validate: (val: string) => val.trim().length > 0
  },
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
  weird: { 
    type: Number, 
    default: 0, 
    short: '--w',
    validate: (val: number) => val >= 0 && val <= 3000
  },
  version: { 
    type: String, 
    default: '7', 
    short: '--v',
    validate: (val: string) => ['5', '5.1', '5.2', '6', '6.1', '7'].includes(val)
  },
  repeat: { 
    type: Number, 
    default: 1, 
    short: '--r',
    validate: (val: number) => Number.isInteger(val) && val >= 1 && val <= 100
  },
  seed: { 
    type: Number, 
    default: 0, 
    short: '--seed',
    validate: (val: number) => Number.isInteger(val) && val >= 0
  },
  sref: { 
    type: String, 
    default: '', 
    short: '--sref',
    validate: (val: string) => val.trim().length > 0
  },
  tile: { 
    type: Boolean, 
    default: false, 
    short: '--tile' 
  },
  video: { 
    type: Boolean, 
    default: false, 
    short: '--video' 
  },
  fast: { 
    type: Boolean, 
    default: false, 
    short: '--fast' 
  },
  iw: { 
    type: Number, 
    default: 0.25, 
    short: '--iw',
    validate: (val: number) => val >= 0 && val <= 5
  },
  relax: { 
    type: Boolean, 
    default: false, 
    short: '--relax' 
  },
  turbo: { 
    type: Boolean, 
    default: false, 
    short: '--turbo' 
  },
  niji: { 
    type: String, 
    default: '6', 
    short: '--niji',
    validate: (val: string) => ['5', '6'].includes(val)
  },
  stealth: { 
    type: Boolean, 
    default: false, 
    short: '--stealth' 
  },
  public: { 
    type: Boolean, 
    default: false, 
    short: '--public' 
  },
  exp: { 
    type: Number, 
    default: 0, 
    short: '--exp',
    validate: (val: number) => val >= 0 && val <= 100
  },
  oref: { 
    type: String, 
    default: '', 
    short: '--oref',
    validate: (val: string) => val.trim().length > 0
  },
  ow: { 
    type: Number, 
    default: 0, 
    short: '--ow',
    validate: (val: number) => val >= 0 && val <= 1000
  },
},
  '6.1': v6,
  '6': v6,
};
export default params