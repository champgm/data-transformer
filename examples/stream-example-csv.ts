#!/usr/bin / env; ts - node;

import csvParse from 'csv-parse';
import fs from 'fs';

// This is a local import, but typically you would use this as a package dependency
import { DataTransformer } from '../src/transformation/DataTransformer';
// So, put something like this instead:
// import { DataTransformer } from 'data-transformer';

// Open the CSV file as a stream
const exampleCsvInput = `${__dirname}/ExampleInput.csv`;
console.log(`Loading example CSV input from file, '${exampleCsvInput}'...`);
const csvReadStream: fs.ReadStream = fs.createReadStream(exampleCsvInput, 'utf8');

// Read the full contents of the specification file into a string
const transformationSpecificationFile = `${__dirname}/TransformationSpecification.yml`;
console.log(`\nLoading transformation specification from file, '${transformationSpecificationFile}'...`);
const transformationSpecification = fs.readFileSync(transformationSpecificationFile).toString('utf8');

// Use the contents of the specification file to initialize the DataTransformer
const dataTransformer: DataTransformer = new DataTransformer(transformationSpecification);

console.log("\nOutputting data from DataTransformer's configured stream...");
// Now, get the stream from the data transformer and pipe it wherever you'd like
dataTransformer.getStream(csvReadStream).pipe(process.stdout);
