import { PromptOptions, MJParamConfig} from './types'

import mjParams from './parameters'

export class MJPromptBuilder {
  private options: PromptOptions = { body: '' };
  private flagMap: Record<string, string> = {};
  private config: MJParamConfig;
  private currentVersion = '7';

  constructor() {
    this.config = mjParams[this.currentVersion];
    this.initOptionsAndFlags();
  }

  private initOptionsAndFlags() {
    this.flagMap = {};
    for (const key in this.config) {
      this.options[key] = this.config[key].default;
      this.flagMap[this.config[key].short] = key;
      this.flagMap[`--${key}`] = key;
    }
  }

  fromString(prompt: string): MJPromptBuilder {
    const versionMatch = prompt.match(/--v\s?(\S+)/);
    this.currentVersion = versionMatch ? versionMatch[1] : '7';
    this.config = mjParams[this.currentVersion] || mjParams['7'];
    this.initOptionsAndFlags();

    const paramRegex = /(--[a-zA-Z]+)(?:\s+(?!-{2})([^\s][^--]*))?/g;

    const body = prompt.split(' --')[0].trim();
    this.options.body = body;

    let match;
    while ((match = paramRegex.exec(prompt)) !== null) {
      const [_, flag, value] = match;

      const key = this.flagMap[flag];
  
      if (key) {
        const param = this.config[key];
        if (param.type === Boolean) {
          this.options[key] = true;
        } else if (param.type === Number) {
          this.options[key] = Number(value);
        } else if (param.type === String) {
          this.options[key] = value.trim();
        }
      }
    }

    return this;
  }

  toString(useShort = true): string {
    const params: string[] = [];

    for (const key in this.config) {
      const param = this.config[key];
      const value = this.options[key];
      const flag = useShort ? param.short : `--${key}`;

      if (param.type === Boolean && value === true) {
        params.push(flag);
      } else if (
        (param.type === Number || param.type === String) &&
        value !== param.default &&
        value !== undefined &&
        value !== ''
      ) {
        params.push(`${flag} ${value}`);
      }
    }

    return [this.options.body, ...params].join(' ').trim();
  }

  fromJSON(obj: PromptOptions): MJPromptBuilder {
    this.options = { ...obj };
    const { version } = obj
    if(version) this.currentVersion = version
    this.config = mjParams[this.currentVersion]
    return this;
  }
  toJSON(onlyNotDefault = false): PromptOptions {
    const obj: PromptOptions = { body: this.options.body };

    for (const key in this.config) {
      if (
        !onlyNotDefault || 
        this.options[key] !== this.config[key].default
      ) {
        obj[key] = this.options[key];
      }
    }

    return obj;
  }
}
