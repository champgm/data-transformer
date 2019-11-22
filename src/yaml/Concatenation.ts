import jsYaml from 'js-yaml';
import { CustomYamlType } from './CustomYamlType';
import { CustomYamlTag } from './CustomYamlTag';

export class Concatenation extends CustomYamlTag {

  public type: CustomYamlType = CustomYamlType.Concatenation;

  constructor(public array: (string | CustomYamlTag)[]) {
    super();
  }

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
          && item.type !== CustomYamlType.Reference) {
          return false;
        }
      }
      return true;
    }
    return false;
  },
  construct: (data: any[]) => new Concatenation(data),
  instanceOf: Concatenation,
  represent: (concat) => { return concat; },
});
