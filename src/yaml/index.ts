import jsYaml from 'js-yaml';

import { concat, Concatenation } from './Concatenation';
import { reference, Reference } from './Reference';
import { CustomYamlType } from './CustomYamlType';

export const CUSTOM_SCHEMA = jsYaml.Schema.create([concat, reference]);


