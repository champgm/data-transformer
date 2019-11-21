export interface TransformationError {
  message: string;
}

export interface TransformationResult {
  datum: any;
  errors: TransformationError[];
  success: boolean;
  transformedDatum?: any;
}
