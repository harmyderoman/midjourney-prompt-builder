export type ParamType = typeof Boolean | typeof String | typeof Number;

export type MJParamConfig = {
  [key: string]: {
    type: ParamType;
    default: any;
    short: string;
    validate?: (val: any) => boolean;
  };
};

export type PromptOptions = {
  body: string;
  [key: string]: any;
};
