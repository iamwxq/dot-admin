import axios, { AxiosHeaders } from "axios";
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
import { CodeEnum, ContentTypeEnum, HttpEnum } from "#/enums/http";

const { VITE_API_URL: API_URL, VITE_APP_MOCK: MOCK } = import.meta.env;

const headers = new AxiosHeaders().setContentType(ContentTypeEnum.JSON);
const baseURL = MOCK === "true" ? `/fake${API_URL}` : API_URL;

const basicConfig: CreateAxiosDefaults = {
  baseURL,
  headers,
  withCredentials: true,
  timeout: <number>HttpEnum.TIMEOUT,
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

export const http = new HttpRequest(basicConfig);
