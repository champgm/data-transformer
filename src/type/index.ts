import jsYaml from 'js-yaml';

import { concat } from './Concat';
import { reference, Reference } from './Reference';

export const CUSTOM_SCHEMA = jsYaml.Schema.create([concat, reference]);

export type CUSTOM_TYPES = Reference;

export enum CustomType {
  Reference = 'Reference',
  Concatenation = 'Concatenation',
}
