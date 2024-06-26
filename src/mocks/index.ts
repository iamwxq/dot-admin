import type { Result } from "#/api";
import { CodeEnum } from "@/enums/http";

export function result<T>(
  data?: T,
  code = CodeEnum.SUCCESS,
  message = "success",
): Result<T> {
  if (data) {
    return {
      data,
      code,
      message,
    };
  }

  return {
    data: null,
    code,
    message,
  };
}

export function success<T>(data?: T, message = "success"): Result<T> {
  return result(data, CodeEnum.SUCCESS, message);
}

export function fail(reason = "系统异常", code = CodeEnum.ERROR): Result<null> {
  return result(null, code, reason);
}
