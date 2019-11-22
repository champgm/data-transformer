import 'jest';
import fs from 'fs';
import jsYaml from 'js-yaml';
import stream from 'stream';

import { DataTransformer, CUSTOM_SCHEMA } from '../../src';
import { SpecificationType } from '../../src/specification/Type';

describe('DataTransformer', () => {
  const exampleYmlPath = `${__dirname}/../../examples/TransformationSpecification.yml`;
  const transformationSpecification = fs.readFileSync(exampleYmlPath).toString('utf8');
  const expectedTransformationSpecification = jsYaml.load(transformationSpecification, { schema: CUSTOM_SCHEMA });
  let dataTransformer: DataTransformer;
  beforeEach(() => {
    dataTransformer = new DataTransformer(expectedTransformationSpecification);
  });
  describe('construction', () => {
    it('should load with schema, given raw file contents', () => {
      const dataTransformer = new DataTransformer(transformationSpecification);
      expect((dataTransformer as any).specification).toEqual(expectedTransformationSpecification);
    });
    it('should store specification unchanged, given a TransformationSpecification', () => {
      const dataTransformer = new DataTransformer(expectedTransformationSpecification);
      expect((dataTransformer as any).specification).toBe(expectedTransformationSpecification);
    });
  });
  describe('getTransformer', () => {
    it('should return an instance of Transform', () => {
      expect(dataTransformer.getTransformer() instanceof stream.Transform).toBeTruthy;
    });
  });
  describe('getTransformer', () => {
    it('should return an instance of Transform', () => {
      const exampleCsvPath = `${__dirname}/../../examples/ExampleInput.csv`;
      const csvReadStream: fs.ReadStream = fs.createReadStream(exampleCsvPath, 'utf8');
      expect(dataTransformer.transformStream(csvReadStream) instanceof stream.Transform).toBeTruthy;
    });
  });
  describe('transform', () => {
    describe('should throw an error if', () => {
      it('a mapping or default value is not found for a required value', () => {
        const testYmlPath = `${__dirname}/specifications/SpecificationWithoutMappingOrDefault.yml`;
        const transformationSpecification = fs.readFileSync(testYmlPath).toString('utf8');
        const dataTransformer = new DataTransformer(transformationSpecification);
        expect(() => { dataTransformer.transform({}); })
          .toThrowError("No mapping or default output value found for required field, 'FieldWithoutMappingOrDefault'");
      });
      it('a unknown output type is specified', () => {
        const testYmlPath = `${__dirname}/specifications/SpecificationWithUnknownOutputType.yml`;
        const transformationSpecification = fs.readFileSync(testYmlPath).toString('utf8');
        const dataTransformer = new DataTransformer(transformationSpecification);
        expect(() => { dataTransformer.transform({}); })
          .toThrowError('An unexpected output specification type, UnknownType was encountered. ' +
            `Valid values are as follows: ${JSON.stringify(SpecificationType)}`);
      });
    });
    it('should use defined defaults if a mapping is not provided', () => {
      const testYmlPath = `${__dirname}/specifications/SpecificationWithoutMapping.yml`;
      const transformationSpecification = fs.readFileSync(testYmlPath).toString('utf8');
      const dataTransformer = new DataTransformer(transformationSpecification);
      const transformedDatum = JSON.parse(dataTransformer.transform({}));
      expect(transformedDatum.transformedDatum.FieldWithoutMapping).toEqual('FieldWithoutMappingDefault');
    });
    it('should catch and store date transformation failures', () => {
      const testYmlPath = `${__dirname}/specifications/SpecificationWithDate.yml`;
      const transformationSpecification = fs.readFileSync(testYmlPath).toString('utf8');
      const dataTransformer = new DataTransformer(transformationSpecification);
      const transformedDatum = JSON.parse(dataTransformer.transform({ FirstField: 'definitely not a date' }));
      expect(transformedDatum.errors[0].message).toEqual('Unable to parse input in field, \'FirstField\' as Date');
      expect(transformedDatum.transformedDatum.FirstField).toEqual('ERROR');
    });
    it('should catch and store number transformation failures', () => {
      const testYmlPath = `${__dirname}/specifications/SpecificationWithNumber.yml`;
      const transformationSpecification = fs.readFileSync(testYmlPath).toString('utf8');
      const dataTransformer = new DataTransformer(transformationSpecification);
      const transformedDatum = JSON.parse(dataTransformer.transform({ FirstField: 'definitely not a number' }));
      expect(transformedDatum.errors[0].message).toEqual('Unable to parse input in field, \'FirstField\' as Number');
      expect(transformedDatum.transformedDatum.FirstField).toEqual('ERROR');
    });
    it('should be able to map true Booleans', () => {
      const testYmlPath = `${__dirname}/specifications/SpecificationWithBoolean.yml`;
      const transformationSpecification = fs.readFileSync(testYmlPath).toString('utf8');
      const dataTransformer = new DataTransformer(transformationSpecification);
      const transformedDatum = JSON.parse(dataTransformer.transform({ FirstField: 'true' }));
      expect(transformedDatum.transformedDatum.FirstField).toEqual(true);
    });
    it('should be able to map false Booleans', () => {
      const testYmlPath = `${__dirname}/specifications/SpecificationWithBoolean.yml`;
      const transformationSpecification = fs.readFileSync(testYmlPath).toString('utf8');
      const dataTransformer = new DataTransformer(transformationSpecification);
      const transformedDatum = JSON.parse(dataTransformer.transform({ FirstField: 'false' }));
      expect(transformedDatum.transformedDatum.FirstField).toEqual(false);
    });
    it('should be able to map Dates', () => {
      const testYmlPath = `${__dirname}/specifications/SpecificationWithDate.yml`;
      const transformationSpecification = fs.readFileSync(testYmlPath).toString('utf8');
      const dataTransformer = new DataTransformer(transformationSpecification);
      const transformedDatum = JSON.parse(dataTransformer.transform({ FirstField: '01-01-1980' }));
      expect(transformedDatum.transformedDatum.FirstField).toEqual('1980-01-01T05:00:00.000Z');
    });
    it('should be able to map Numbers', () => {
      const testYmlPath = `${__dirname}/specifications/SpecificationWithNumber.yml`;
      const transformationSpecification = fs.readFileSync(testYmlPath).toString('utf8');
      const dataTransformer = new DataTransformer(transformationSpecification);
      const transformedDatum = JSON.parse(dataTransformer.transform({ FirstField: 100 }));
      expect(transformedDatum.transformedDatum.FirstField).toEqual(100);
    });
    it('should be able to map Strings', () => {
      const testYmlPath = `${__dirname}/specifications/SpecificationWithString.yml`;
      const transformationSpecification = fs.readFileSync(testYmlPath).toString('utf8');
      const dataTransformer = new DataTransformer(transformationSpecification);
      const transformedDatum = JSON.parse(dataTransformer.transform({ FirstField: 'this is a string' }));
      expect(transformedDatum.transformedDatum.FirstField).toEqual('this is a string');
    });
  });
});
