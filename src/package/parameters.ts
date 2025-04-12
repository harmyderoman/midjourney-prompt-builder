import { MJParamConfig } from "./types"

const params: MJParamConfig = {
  ar: { type: String, default: '1:1', short: '--ar' },
  chaos: { type: Number, default: 0, short: '--c' },
  cref: { type: String, default: '', short: '--cref' },
  no: { type: String, default: '', short: '--no' },
  profile: { type: String, default: '', short: '--p' },
  quality: { type: Number, default: 1, short: '--q' },
  repeat: { type: Number, default: 1, short: '--r' },
  seed: { type: Number, default: 0, short: '--seed' },
  stop: { type: Number, default: 100, short: '--stop' },
  raw: { type: Boolean, default: false, short: '--raw' },
  stylize: { type: Number, default: 100, short: '--s' },
  sref: { type: String, default: '', short: '--sref' },
  tile: { type: Boolean, default: false, short: '--tile' },
  version: { type: String, default: '7', short: '--v' },
  video: { type: Boolean, default: false, short: '--video' },
  weird: { type: Number, default: 0, short: '--w' },
  fast: { type: Boolean, default: false, short: '--fast' },
  iw: { type: Number, default: 0.25, short: '--iw' },
  relax: { type: Boolean, default: false, short: '--relax' },
  turbo: { type: Boolean, default: false, short: '--turbo' },
  niji: { type: String, default: '6', short: '--niji' },
  stealth: { type: Boolean, default: false, short: '--stealth' },
  public: { type: Boolean, default: false, short: '--public' },
  draft: { type: Boolean, default: false, short: '--draft' },
};
export default params