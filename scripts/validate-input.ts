
import path from 'path';
import csvParse from 'csv-parse';
import jsYaml from 'js-yaml';

import { validateInputOutputSpecification, validateInputMappingSpecification } from '../src/models/TransformationSpecification';
import { validateDatum } from '../src/models/Datum';

const scriptLocation = path.basename(__filename);
const exampleInput = `${scriptLocation}/../lib/ExampleInput.csv`;
const transformationSpecification = `${scriptLocation}/../lib/TransformationSpecification.yml`;

const transformationYml = jsYaml.safeLoad(transformationSpecification);
console.log(`transformationYml${JSON.stringify(transformationYml, null, 2)}`);

validateInputOutputSpecification(transformationYml.InputSpecification);
validateInputOutputSpecification(transformationYml.OutputSpecification);
validateInputMappingSpecification(transformationYml.MappingSpecification);

const parser: csvParse.Parser = csvParse();
parser.on('readable', () => {
  let record;
  while (record = parser.read()) {
    validateDatum(record);
  }
});
parser.on('error', (error) => {
  console.error(`Error parsing CSV: ${error.message}`);
  console.error(`Error parsing CSV: ${JSON.stringify(error, null, 2)}`);
});
