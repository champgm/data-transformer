#!/usr/bin/env ts-node

import csvParse from 'csv-parse';
import jsYaml from 'js-yaml';
import fs from 'fs';

import { configureTransformer } from '../src';

import { CUSTOM_SCHEMA } from '../src/yaml';

console.log('Validating Transformation Specification...');
const exampleInput = `${__dirname}/../lib/ExampleInput.csv`;
const transformationSpecification = `${__dirname}/../lib/TransformationSpecification.yml`;
const transformationYmlFile = fs.readFileSync(transformationSpecification, 'utf8');
const transformationYml = jsYaml.load(transformationYmlFile, { schema: CUSTOM_SCHEMA });
console.log(`transformationYml${JSON.stringify(transformationYml, null, 2)}`);

console.log('Validating CSV file contents...');
const csvStream = fs.createReadStream(exampleInput);
const parser: csvParse.Parser = csvParse({ columns: true });

const transformer = configureTransformer(transformationYmlFile);

csvStream.pipe(parser).pipe(transformer).pipe(process.stdout);
