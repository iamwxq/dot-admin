import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import { message } from "antd";
import { checkStatus } from "./helper";
import type { Result } from "#/api";
import { CodeEnum, HttpEnum } from "#/enums/http";

const basicConfig: CreateAxiosDefaults = {
  withCredentials: true,
  responseEncoding: "utf8",
  timeout: HttpEnum.TIMEOUT as number,
  baseURL: import.meta.env.VITE_API_URL,
};

class HttpRequest {
  private instance: AxiosInstance;

  public constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config);

    /**
     * @description 请求拦截器
     */
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (err: AxiosError) => {
        return Promise.reject(err);
      },
    );

    /**
     * @description 响应拦截器
     */
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, code, msg } = response.data as Result;

        if (code && code !== CodeEnum.SUCCESS) {
          message.error(msg);
          return Promise.reject(response.data);
        }

        return data;
      },
      (err: AxiosError) => {
        const { response } = err;

        if (response)
          checkStatus(response.status);

        return Promise.reject(err);
      },
    );
  }

  public get<T>(url: string, params?: object, options: Omit<AxiosRequestConfig, "params"> = {}): Promise<T> {
    return this.instance.get(url, { ...options, params });
  }

  public post<T>(url: string, data?: object, options: Omit<AxiosRequestConfig, "data"> = {}): Promise<T> {
    return this.instance.post(url, data, options);
  }

  public put<T>(url: string, data?: object, options: Omit<AxiosRequestConfig, "data"> = {}): Promise<T> {
    return this.instance.put(url, data, options);
  }

  public delete<T>(url: string, params?: object, options: Omit<AxiosRequestConfig, "params"> = {}): Promise<T> {
    return this.instance.delete(url, { ...options, params });
  }

  public download(url: string, data?: object, options: Omit<AxiosRequestConfig, "data" | "responseType"> = {}): Promise<BlobPart> {
    return this.instance.post(url, data, { ...options, responseType: "blob" });
  }
}

export default new HttpRequest(basicConfig);
