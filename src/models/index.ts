export function verifyType<T>(
  value: T,
  fieldName: string,
  type: string,
  required: boolean = true,
): T {
  if ((value === null || typeof value === 'undefined') && !required) {
    return value;
  }
  if (typeof value !== type) {
    throw new Error(`Field, '${fieldName}' ` +
      `is of type, '${typeof value}' ` +
      `but should be of type, '${type}'`);
  }
  return value;
}
