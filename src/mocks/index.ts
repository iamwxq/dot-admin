import type { HttpHandler } from "msw";
import { http } from "msw";
import type { Result } from "#/api";
import { CodeEnum } from "#/enums/http";

const { VITE_API_URL: API_URL } = import.meta.env;

export class HttpMock {
  private static prefix: string = `/fake${API_URL}`;

  /**
   * 通用响应体结果
   *
   * @param data 数据
   * @param code 后端状态码
   * @param msg 响应信息
   */
  public static result<T>(data?: T, code = CodeEnum.SUCCESS, msg = "success"): Result<T> {
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
  public static success<T>(data?: T, msg = "success"): Result<T> {
    return this.result(data, CodeEnum.SUCCESS, msg);
  }

  /**
   * 请求失败响应体结果
   *
   * @param reason 失败原因
   * @param code 失败状态码
   */
  public static fail(reason: string = "系统异常", code = CodeEnum.ERROR): Result<null> {
    return this.result(null, code, reason);
  }

  /**
   * @description `http.post` 的封装: 添加了从环境变量中读取的 api 前缀
   */
  public static post(...args: Parameters<typeof http.post>): HttpHandler {
    args[0] = `${this.prefix}${args[0]}`;
    return http.post(...args);
  }

  /**
   * @description `http.get` 的封装: 添加了从环境变量中读取的 api 前缀
   */
  public static get(...args: Parameters<typeof http.get>): HttpHandler {
    args[0] = `${this.prefix}${args[0]}`;
    return http.get(...args);
  }

  /**
   * @description `http.delete` 的封装: 添加了从环境变量中读取的 api 前缀
   */
  public static delete(...args: Parameters<typeof http.delete>): HttpHandler {
    args[0] = `${this.prefix}${args[0]}`;
    return http.delete(...args);
  }

  /**
   * @description `http.put` 的封装: 添加了从环境变量中读取的 api 前缀
   */
  public static put(...args: Parameters<typeof http.put>): HttpHandler {
    args[0] = `${this.prefix}${args[0]}`;
    return http.put(...args);
  }

  /**
   * @description `http.post` 的封装: 添加了从环境变量中读取的 api 前缀; 为下载接口语义化了post方法
   */
  public static download(...args: Parameters<typeof http.post>): HttpHandler {
    args[0] = `${this.prefix}${args[0]}`;
    return http.post(...args);
  }
}
