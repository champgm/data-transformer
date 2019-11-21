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
