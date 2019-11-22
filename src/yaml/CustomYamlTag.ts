import { CustomYamlType } from './CustomYamlType';

export abstract class CustomYamlTag {
  public abstract type: CustomYamlType;
  public abstract toString(datum: any): string;
}
