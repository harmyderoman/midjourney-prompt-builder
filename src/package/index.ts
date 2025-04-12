import { PromptOptions, MJParamConfig} from './types'

import mjParams from './parameters'

export class MJPromptBuilder {
  private options: PromptOptions = { body: '' };

  private flagMap: Record<string, string> = {};

  constructor(private config: MJParamConfig = mjParams) {
    for (const key in config) {
      this.options[key] = config[key].default;

      // For quick lookup by short and long names
      this.flagMap[config[key].short] = key;
      this.flagMap[`--${key}`] = key;
    }
  }

  fromString(prompt: string): MJPromptBuilder {
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
    return this;
  }

  toJSON(): PromptOptions {
    const obj: PromptOptions = { body: this.options.body };

    for (const key in this.config) {
      obj[key] = this.options[key];
    }

    return obj;
  }
}