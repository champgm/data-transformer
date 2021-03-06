import csvParse from 'csv-parse';
import jsYaml from 'js-yaml';
import stream from 'stream';
import streamTransform from 'stream-transform';

import { TransformationSpecification } from '../specification/TransformationSpecification';
import { TransformationError, TransformationResult } from './TransformationTypes';
import { SpecificationType } from '../specification/Type';
import { CUSTOM_SCHEMA } from '../yaml';

export class DataTransformer {

  private specification: TransformationSpecification;

  /**
   * Creates an instance of DataTransformer
   *
   * @param specification The contents of a TransformationSpecification in a string,
   * or pre-parsed using CUSTOM_SCHEMA
   */
  constructor(specification: string);
  constructor(specification: TransformationSpecification);
  constructor(specification: any) {
    if (typeof specification === 'string') {
      this.specification = jsYaml.load(specification, { schema: CUSTOM_SCHEMA });
    } else {
      this.specification = specification as TransformationSpecification;
    }
  }

  /**
   * Attempts to transform the given datum using the given specifications
   * @throws an Error if TransformationSpecification is found to be invalid in any way
   */
  public transform(datum: any): string {
    const transformedDatum = {};
    const errors: TransformationError[] = [] as TransformationError[];

    // We need to look through all keys of the output specification and try to map a value onto each
    Object.keys(this.specification.OutputSpecification).forEach((key) => {
      const outputSpecification = this.specification.OutputSpecification[key];
      const mappingSpecification = this.specification.MappingSpecification[key];

      // There may be no mapping.
      // It's possible the value should just be a default, assign it that if there is one
      if (!mappingSpecification) {
        if (outputSpecification.Default !== undefined) {
          transformedDatum[key] = outputSpecification.Default;
          return;
        }
        // Throw an error if no default is provided
        throw new Error(`No mapping or default output value found for required field, '${key}'`);
      }

      // Now, try to actually map each value according to the specified type
      try {
        const mappedStringValue = mappingSpecification.Input.toString(datum);
        switch (outputSpecification.Type) {
          case SpecificationType.Boolean:
            transformedDatum[key] = mappedStringValue.toLocaleUpperCase() === 'TRUE';
            return;
          case SpecificationType.Date:
            const parsedDate = Date.parse(mappedStringValue);
            if (!parsedDate) throw new Error(`Unable to parse input in field, '${key}' as Date`);
            transformedDatum[key] = new Date(parsedDate);
            return;
          case SpecificationType.Number:
            const mappedStringValueWithoutComma = mappedStringValue.replace(',', '');
            transformedDatum[key] = parseFloat(mappedStringValueWithoutComma);
            if (!transformedDatum[key]) throw new Error(`Unable to parse input in field, '${key}' as Number`);
            return;
          case SpecificationType.String:
            transformedDatum[key] = mappedStringValue;
            return;
        }
      } catch (error) {
        // Save errors for later
        transformedDatum[key] = 'ERROR';
        errors.push({ message: error.message });
      }

      // If it doesn't have a value by now, that switch statement must have fallen through
      // Which indicates a mapping specification error
      if (transformedDatum[key] === undefined) {
        throw new Error(`An unexpected output specification type, ${outputSpecification.Type} was encountered. Valid values are as follows: ${JSON.stringify(SpecificationType)}`);
      }
    });

    const transformationResult: TransformationResult = {
      datum,
      errors,
      success: errors.length === 0,
      transformedDatum,
    };
    if (!transformationResult.success) {
      console.error(`Some errors ocurred while transforming this datum: ${JSON.stringify(transformationResult)}`);
    }
    return JSON.stringify(transformationResult);
  }

  /**
   * Returns a stream of data, transformed from a stream of raw CSV data
   * according to the given specification
   */
  public transformStream(csvStream: stream.Readable): stream.Transform {
    const parser: csvParse.Parser = csvParse({ columns: true });
    return csvStream.pipe(parser).pipe(this.getTransformer());
  }

  /**
   * Returns a transformer which can transform raw CSV data
   * according to the given specification
   */
  public getTransformer(): stream.Transform {
    return streamTransform(this.transform.bind(this));
  }
}
