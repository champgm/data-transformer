import jsYaml from 'js-yaml';
import fs from 'fs';
import streamTransform from 'stream-transform';

import { CUSTOM_SCHEMA } from './yaml';
import { DataTransformer } from './transformation/DataTransformer';
import { TransformationSpecification } from './specification/TransformationSpecification';

function configureTransformerFromFile(
  transformationSpecificationFilePath: string,
): streamTransform.Transformer {
  const transformationYmlFileContents = fs.readFileSync(transformationSpecificationFilePath, 'utf8');
  return configureTransformer(transformationYmlFileContents);
}

function configureTransformer(
  transformationYmlFileContents: string,
): streamTransform.Transformer {
  const specification = jsYaml.load(transformationYmlFileContents, { schema: CUSTOM_SCHEMA });
  return configureTransformerFromSpecification(specification);
}

function configureTransformerFromSpecification(
  specification: TransformationSpecification,
): streamTransform.Transformer {
  const dataTransformer = new DataTransformer(specification);
  return streamTransform(dataTransformer.transform.bind(dataTransformer));
}

export {
  configureTransformerFromFile,
  configureTransformer,
  configureTransformerFromSpecification,
  TransformationSpecification,
};
