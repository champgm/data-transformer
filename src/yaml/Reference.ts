import jsYaml from 'js-yaml';

import { CustomYamlType } from './CustomYamlType';
import { CustomYamlTag } from './CustomYamlTag';

export class Reference extends CustomYamlTag {

  public type: CustomYamlType = CustomYamlType.Reference;

  constructor(public reference: string) {
    super();
  }

  public toString(datum: any): string {
    return String(datum[this.reference]);
  }
}

export const reference = new jsYaml.Type('!Ref', {
  kind: 'scalar',
  resolve: data => (typeof data === 'string'),
  construct: (data: string) => new Reference(data),
  instanceOf: Reference,
  represent: data => data,
});
