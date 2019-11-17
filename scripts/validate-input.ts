#!/usr/bin/env ts-node-to

import csvParse from 'csv-parse';
import jsYaml from 'js-yaml';
import fs from 'fs';

import { validateDatum } from '../src/models/Datum';
import { CUSTOM_SCHEMA } from '../src/type';

console.log('Validating Transformation Specification...');
const exampleInput = `${__dirname}/../lib/ExampleInput.csv`;
const transformationSpecification = `${__dirname}/../lib/TransformationSpecification.yml`;
const transformationYmlFile = fs.readFileSync(transformationSpecification, 'utf8');
const transformationYml = jsYaml.load(transformationYmlFile, { schema: CUSTOM_SCHEMA });
console.log(`transformationYml${JSON.stringify(transformationYml, null, 2)}`);

console.log('Validating CSV file contents...');
const csvStream = fs.createReadStream(exampleInput);
const parser: csvParse.Parser = csvParse({ columns: true });
parser.on('readable', () => {
  let record;
  while (record = parser.read()) {
    console.log(`Read record: ${JSON.stringify(record)}`);
    validateDatum(record);
  }
});
parser.on('error', (error) => {
  console.error(`Error parsing CSV: ${error.message}`);
  console.error(`Error parsing CSV: ${JSON.stringify(error, null, 2)}`);
});
csvStream.pipe(parser);
