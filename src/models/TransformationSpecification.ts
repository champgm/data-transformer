import { verifyType } from './';

export interface SpecificationItem {
  Type: string;
  Default: string;
  Required: boolean;
}

export function validateSpecificationItem(item: any) {
  verifyType(item.Type, 'Type', 'string', true);
  verifyType(item.Default, 'Default', 'string', false);
  verifyType(item.Required, 'Required', 'boolean', false);
}

export interface InputOutputSpecification {
  [field: string]: SpecificationItem;
}

export function validateInputOutputSpecification(specification: any) {
  Object.keys(specification).forEach((item) => {
    validateSpecificationItem(item);
  });
}

export interface MappingItem {
  Input: string;
}

export function validateMappingItem(item: any) {
  verifyType(item.Input, 'Input', 'string', true);
}

export interface MappingSpecification {
  [field: string]: SpecificationItem;
}

export function validateInputMappingSpecification(specification: any) {
  Object.keys(specification).forEach((item) => {
    validateMappingItem(item);
  });
}
