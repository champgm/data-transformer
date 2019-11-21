import jsYaml from 'js-yaml';
import { CustomType } from './CustomTypes';
import { Reference } from './Reference';

export class Concatenation {
  public type: CustomType = CustomType.Concatenation;
  constructor(public array: (string | Reference)[]) { }
  public toString(datum: any): string {
    const stringArray = this.array.map((item) => {
      if (typeof item === 'string') {
        return item;
      }
      return item.toString(datum);
    });
    return stringArray.join('');
  }
}

export const concat = new jsYaml.Type('!Concat', {
  kind: 'sequence',
  resolve: (data) => {
    if (Array.isArray(data)) {
      for (const item of data) {
        if (typeof item !== 'string'
          && item.type !== CustomType.Reference) {
          console.log("Data in '!Concat' tag must be string or '!Reference'");
          return false;
        }
      }
      return true;
    }
    console.log("Data within '!Concat' tag must be an array");
    return false;
  },
  construct: (data: any[]) => new Concatenation(data),
  instanceOf: Concatenation,
  represent: (concat) => { return concat; },
});