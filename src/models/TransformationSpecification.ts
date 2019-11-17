import { SpecificationType } from './Type';
import { Concatenation } from '../type/Concat';
import { Reference } from '../type/Reference';

export interface SpecificationItem {
  Type: SpecificationType;
  Default: string;
  Required: boolean;
}

export interface InputOutputSpecification {
  [field: string]: SpecificationItem;
}

export interface MappingItem {
  Input: string | Concatenation | Reference;
}

export interface MappingSpecification {
  [field: string]: MappingItem;
}

export interface TransformationSpecification {
  MappingSpecification: MappingSpecification;
  InputSpecification: InputOutputSpecification;
  OutputSpecification: InputOutputSpecification;
}
