import jsYaml from 'js-yaml';

import { concat } from './Concatenation';
import { reference } from './Reference';

export const CUSTOM_SCHEMA = jsYaml.Schema.create([concat, reference]);
