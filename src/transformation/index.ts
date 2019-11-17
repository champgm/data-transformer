import { TransformationSpecification } from '../models/TransformationSpecification';

export function transform(datum: any, specification: TransformationSpecification) {
  const transformed = {};
  Object.keys(specification.OutputSpecification).forEach((key) => {
    const outputSpecification = specification.OutputSpecification[key];
    const mappingSpecification = specification.MappingSpecification[key];
    if (!mappingSpecification) {
      if (outputSpecification.Default) return outputSpecification.Default;
      throw new Error(`No value found for required field, '${key}'`);
    }
    if(typeof mappingSpecification==='string'){}
  });
}
