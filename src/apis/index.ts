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
import { message } from "antd";
import axios, { AxiosHeaders } from "axios";

type OmitData = Omit<AxiosRequestConfig, "data">;
type OmitParams = Omit<AxiosRequestConfig, "params">;
type StreamOption = Omit<AxiosRequestConfig, "data" | "responseType">;

const { VITE_API_URL: API_URL, VITE_APP_MOCK: MOCK } = import.meta.env;

const headers = new AxiosHeaders().setContentType(ContentTypeEnum.JSON);
const baseURL = MOCK === "true" ? `/fake${API_URL}` : API_URL;

const basicConfig: CreateAxiosDefaults = {
  baseURL,
  headers,
  withCredentials: true,
  timeout: <number>HttpEnum.TIMEOUT,
};

export class HttpRequest {
  private static axiosInstance: AxiosInstance;
  private static httpRequestInstance: HttpRequest;

  private constructor(config: CreateAxiosDefaults) {
    HttpRequest.axiosInstance = axios.create(config);

    /**
     * @description 请求拦截器
     */
    HttpRequest.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // await sleep(0.7); // mock requests delay, to be removed
        return config;
      },
      (err: AxiosError) => {
        return Promise.reject(err);
      },
    );

    /**
     * @description 响应拦截器
     */
    HttpRequest.axiosInstance.interceptors.response.use(
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

  public static getInstance(): HttpRequest {
    return (HttpRequest.httpRequestInstance ??= new HttpRequest(basicConfig));
  }

  public get<T>({ url, params, options = {} }: {
    url: string;
    params?: object;
    options?: OmitParams;
  }): Promise<T> {
    return HttpRequest.axiosInstance.get(url, { ...options, params });
  }

  public post<T>({ url, data, options = {} }: {
    url: string;
    data?: object;
    options?: OmitData;
  }): Promise<T> {
    return HttpRequest.axiosInstance.post(url, data, options);
  }

  public put<T>({ url, data, options }: {
    url: string;
    data?: object;
    options?: OmitData;
  }): Promise<T> {
    return HttpRequest.axiosInstance.put(url, data, options);
  }

  public delete<T>({ url, params, options }: {
    url: string;
    params?: object;
    options?: OmitParams;
  }): Promise<T> {
    return HttpRequest.axiosInstance.delete(url, { ...options, params });
  }

  public stream({ url, data, options }: {
    url: string;
    data?: object;
    options?: StreamOption;
  }): Promise<BlobPart> {
    return HttpRequest.axiosInstance.post(url, data, { ...options, responseType: "blob" });
  }
}
