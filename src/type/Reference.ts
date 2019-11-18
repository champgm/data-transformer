import jsYaml from 'js-yaml';
import _ from 'lodash';

import { CustomType } from '.';

export class Reference {
  public type: CustomType = CustomType.Reference;
  constructor(public reference: string) { }
  public toString(datum: any): string {
    return _.get(datum, this.reference);
  }
}

export const reference = new jsYaml.Type('!Ref', {
  kind: 'scalar',
  resolve: data => (typeof data === 'string'),
  construct: (data: string) => new Reference(data),
  instanceOf: Reference,
  represent: data => JSON.stringify(data),
});
