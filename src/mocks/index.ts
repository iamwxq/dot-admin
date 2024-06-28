import type { HttpHandler } from "msw";
import { http } from "msw";
import type { Result } from "#/api";
import { CodeEnum } from "#/enums/http";

/**
 * 通用响应体结果
 *
 * @param data 数据
 * @param code 后端状态码
 * @param msg 信息
 */
export function result<T>(
  data?: T,
  code = CodeEnum.SUCCESS,
  msg = "success",
): Result<T> {
  if (data !== undefined) {
    return { data, code, msg };
  }

  return { data: null, code, msg };
}

/**
 * 请求成功响应体结果
 *
 * @param data 数据
 * @param msg 成功信息
 */
export function success<T>(data?: T, msg = "success"): Result<T> {
  return result(data, CodeEnum.SUCCESS, msg);
}

/**
 * 请求失败响应体结果
 *
 * @param reason 失败原因
 * @param code 失败状态码
 */
export function fail(reason: string = "系统异常", code = CodeEnum.ERROR): Result<null> {
  return result(null, code, reason);
}

/**
 * @description `http.post` 的封装: 添加了从环境变量中读取的 api 前缀
 */
export function httpPost(...args: Parameters<typeof http.post>): HttpHandler {
  args[0] = `${import.meta.env.VITE_API_URL}${args[0]}`;
  return http.post(...args);
}

/**
 * @description `http.get` 的封装: 添加了从环境变量中读取的 api 前缀
 */
export function httpGet(...args: Parameters<typeof http.get>): HttpHandler {
  args[0] = `${import.meta.env.VITE_API_URL}${args[0]}`;
  return http.get(...args);
}

/**
 * @description `http.delete` 的封装: 添加了从环境变量中读取的 api 前缀
 */
export function httpDelete(...args: Parameters<typeof http.delete>): HttpHandler {
  args[0] = `${import.meta.env.VITE_API_URL}${args[0]}`;
  return http.delete(...args);
}

/**
 * @description `http.put` 的封装: 添加了从环境变量中读取的 api 前缀
 */
export function httpPut(...args: Parameters<typeof http.put>): HttpHandler {
  args[0] = `${import.meta.env.VITE_API_URL}${args[0]}`;
  return http.put(...args);
}
