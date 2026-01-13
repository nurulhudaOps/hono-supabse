import { ContentfulStatusCode } from "hono/utils/http-status";

export interface ApiResponse<T = any> {
  success: boolean;
  code: ContentfulStatusCode;
  data: T | null;
  message: string;
}

export interface ErrorCustomType {
  message: string;
  code: ContentfulStatusCode;
}

export interface WrapperData<T = any> {
  data: T | null;
  error: ApiResponse | null
}