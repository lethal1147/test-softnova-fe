export interface BaseResponseProps<T> {
  statusCode: number;
  message: string;
  data: T;
  error: boolean;
}

export interface BaseQueryIndexProps {
  page: number;
  limit: number;
}
