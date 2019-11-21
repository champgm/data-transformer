import { SpecificationType } from './Type';
import { Concatenation } from '../yaml/Concat';
import { Reference } from '../yaml/Reference';

export interface SpecificationItem {
  Type: SpecificationType;
  Default: string;
  Required: boolean;
}

export interface InputOutputSpecification {
  [field: string]: SpecificationItem;
}

export interface MappingItem {
  Input: Concatenation | Reference;
}
export interface MappingSpecification {
  [field: string]: MappingItem;
}

export interface TransformationSpecification {
  MappingSpecification: MappingSpecification;
  InputSpecification: InputOutputSpecification;
  OutputSpecification: InputOutputSpecification;
}
