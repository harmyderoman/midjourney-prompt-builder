export type ParamType = typeof Boolean | typeof String | typeof Number;

export type MJParamConfig = {
  [key: string]: {
    type: ParamType;
    default: any;
    short: string;
  };
};

export type PromptOptions = {
  body: string;
  [key: string]: any;
};
