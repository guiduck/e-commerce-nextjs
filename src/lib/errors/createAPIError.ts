/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIResponse } from "@/lib/api";

export function createAPIError<T = any>(
  message: string,
  status = 400,
  debug: any = null
): APIResponse<T> {
  return {
    status,
    data: null,
    error: true,
    errorUserMessage: message,
    debug,
    headers: null,
  };
}
