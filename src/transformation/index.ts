import { TransformationSpecification } from '../models/TransformationSpecification';
import { CustomType } from '../type';
import { SpecificationType } from '../models/Type';

export interface TransformationError {
  error: any;
  message: string;
}

export interface TransformationResult {
  datum: any;
  errors: TransformationError[];
  success: boolean;
  transformedDatum?: any;
}

export function transform(datum: any, specification: TransformationSpecification): TransformationResult {
  const transformedDatum = {};
  const errors: TransformationError[] = [] as TransformationError[];

  // We need to look through all keys of the output specification and try to map a value onto each
  Object.keys(specification.OutputSpecification).forEach((key) => {
    const outputSpecification = specification.OutputSpecification[key];
    const mappingSpecification = specification.MappingSpecification[key];

    // It's possible the value should just be some default, assign it that if there is one
    if (!mappingSpecification) {
      if (outputSpecification.Default) {
        transformedDatum[key] = outputSpecification.Default;
        return;
      }

      // Throw an error if no matching specification is found and no default is provided
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
          transformedDatum[key] = Date.parse(mappedStringValue);
          return;
        case SpecificationType.Number:
          transformedDatum[key] = Number(mappedStringValue);
          return;
        case SpecificationType.String:
          transformedDatum[key] = mappedStringValue;
          return;
      }
    } catch (error) {
      // Save errors for later
      transformedDatum[key] = 'ERROR';
      errors.push({
        error,
        message: `An error ocurred while transforming field, '${key}' of the following datum: ${JSON.stringify(datum)}`,
      });
    }

    // If it doesn't have a value by now, that switch statement must have fallen through
    // Which indicates a mapping specification error
    if (transformedDatum[key] === undefined) {
      throw new Error(`An unexpected output specification type, ${outputSpecification.Type} was encountered.
Valid values are as follows: ${JSON.stringify(SpecificationType)}`);
    }
  });
  return {
    datum,
    errors,
    success: errors.length === 0,
    transformedDatum,
  };
}
