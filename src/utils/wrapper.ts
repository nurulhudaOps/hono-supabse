import { ContentfulStatusCode } from "hono/utils/http-status";
import { ApiResponse, ErrorCustomType, WrapperData } from "../types/wrapper.type.js";

export const createResponse = <T = any>(
  success: boolean,
  code: ContentfulStatusCode,
  data: T | null = null,
  message: string = ''
): ApiResponse<T> => {
  return {
    success,
    code,
    data,
    message,
  };
};

export const successResponse = <T = any>(
  data: T,
  message: string = 'Success',
  code: ContentfulStatusCode = 200
): ApiResponse<T> => {
  return createResponse(true, code, data, message);
};

export const errorResponse = (
  message: string,
  code: ContentfulStatusCode = 400,
  data: any = null
): ApiResponse => {
  return createResponse(false, code, data, message);
};

export const wrapperData = <T = any>(data: T | null, error: ErrorCustomType | null): WrapperData => {
  if (error) {
    return { data: null, error: errorResponse(error.message, error.code) }
  }

  return { data, error: null }
}