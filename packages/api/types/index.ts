export interface IResult<T> {
  error: boolean;
  success: boolean;
  data: T;
  message: string;
}
