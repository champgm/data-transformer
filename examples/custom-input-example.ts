#!/usr/bin/env ts-node;

import fs from 'fs';
import inquirer from 'inquirer';

import { DataTransformer } from '../src/transformation/DataTransformer';

inquirer.prompt([
  {
    type: 'input',
    name: 'specification',
    message: 'Input the path to the specification file you wish to transform',
  },
  {
    type: 'input',
    name: 'csv',
    message: 'Input the path to the CSV file you wish to transform',
  },
])
  .then((answers) => {
    // Open the CSV file as a stream
    console.log(`Loading example CSV input from file, '${answers.csv}'...`);
    const csvReadStream: fs.ReadStream = fs.createReadStream(answers.csv, 'utf8');

    // Read the full contents of the specification file into a string
    console.log(`\nLoading transformation specification from file, '${answers.specification}'...`);
    const transformationSpecification = fs.readFileSync(answers.specification).toString('utf8');

    // Use the contents of the specification file to initialize the DataTransformer
    const dataTransformer: DataTransformer = new DataTransformer(transformationSpecification);

    console.log("\nOutputting data from DataTransformer's configured stream...");
    // Now, get the stream from the data transformer and pipe it wherever you'd like
    dataTransformer.transformStream(csvReadStream).pipe(process.stdout);
  });
