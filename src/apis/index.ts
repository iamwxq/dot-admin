import type { Result } from "#/api";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import { CodeEnum, ContentTypeEnum, HttpEnum } from "#/enums/http";
import { checkStatus } from "@/apis/helpers";
import { sleep } from "@/utils";
import { message } from "antd";
import axios, { AxiosHeaders } from "axios";

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
      async (config: InternalAxiosRequestConfig) => {
        await sleep(0.7); // TODO mocking requests delay, to be removed
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

  public get<T>({ url, params, options = {} }: {
    url: string;
    params?: object;
    options?: Omit<AxiosRequestConfig, "params">;
  }): Promise<T> {
    return this.instance.get(url, { ...options, params });
  }

  public post<T>({ url, data, options = {} }: {
    url: string;
    data?: object;
    options?: Omit<AxiosRequestConfig, "data">;
  }): Promise<T> {
    return this.instance.post(url, data, options);
  }

  public put<T>({ url, data, options }: {
    url: string;
    data?: object;
    options?: Omit<AxiosRequestConfig, "data">;
  }): Promise<T> {
    return this.instance.put(url, data, options);
  }

  public delete<T>({ url, params, options }: {
    url: string;
    params?: object;
    options?: Omit<AxiosRequestConfig, "params">;
  }): Promise<T> {
    return this.instance.delete(url, { ...options, params });
  }

  public stream({ url, data, options }: {
    url: string;
    data?: object;
    options?: Omit<AxiosRequestConfig, "data" | "responseType">;
  }): Promise<BlobPart> {
    return this.instance.post(url, data, { ...options, responseType: "blob" });
  }
}

export const http = new HttpRequest(basicConfig);
