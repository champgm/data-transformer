import 'jest';
import fs from 'fs';
import jsYaml from 'js-yaml';
import stream from 'stream';

import { CUSTOM_SCHEMA } from '../../src/yaml';
import { DataTransformer } from '../../src/transformation/DataTransformer';

describe('DataTransformer', () => {
  const exampleYmlPath = `${__dirname}/../../examples/TransformationSpecification.yml`;
  const transformationSpecification = fs.readFileSync(exampleYmlPath).toString('utf8');
  const expectedTransformationSpecification = jsYaml.load(transformationSpecification, { schema: CUSTOM_SCHEMA });
  let dataTransformer: DataTransformer;
  beforeEach(() => {
    dataTransformer = new DataTransformer(expectedTransformationSpecification);
  });
  describe('construction', () => {
    it('should load with schema, given raw file contents', async () => {
      const dataTransformer = new DataTransformer(transformationSpecification);
      expect((dataTransformer as any).specification).toEqual(expectedTransformationSpecification);
    });
    it('should store specification unchanged, given a TransformationSpecification', async () => {
      const dataTransformer = new DataTransformer(expectedTransformationSpecification);
      expect((dataTransformer as any).specification).toBe(expectedTransformationSpecification);
    });
  });
  describe('getTransformer', () => {
    it('should return an instance of Transform', async () => {
      expect(dataTransformer.getTransformer() instanceof stream.Transform).toBeTruthy;
    });
  });
  describe('getTransformer', () => {
    it('should return an instance of Transform', async () => {
      const exampleCsvPath = `${__dirname}/../../examples/ExampleInput.csv`;
      const csvReadStream: fs.ReadStream = fs.createReadStream(exampleCsvPath, 'utf8');
      expect(dataTransformer.transformStream(csvReadStream) instanceof stream.Transform).toBeTruthy;
    });
  });
  describe('transform', () => {
    describe('should throw an error if', () => {
      it('A mapping or default value is not found for a required value', async () => {
        const testYmlPath = `${__dirname}/specifications/SpecificationWithoutMappingOrDefault.yml`;
        const transformationSpecification = fs.readFileSync(testYmlPath).toString('utf8');
        const dataTransformer = new DataTransformer(transformationSpecification);
        expect(dataTransformer.transform({}))
          .toThrowError("No mapping or default output value found for required field, 'asdf'");
      });
    });
  });
});
