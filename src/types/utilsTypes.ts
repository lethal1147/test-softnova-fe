export interface BaseResponseProps<T> {
  statusCode: number;
  message: string;
  data: T;
  error: boolean;
}
