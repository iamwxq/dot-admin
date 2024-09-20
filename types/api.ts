import type { CodeEnum } from "#/enums/http";

export interface Result<T = any> {
  msg: string;
  code: CodeEnum;
  data: T | null;
}

export interface PParam<T> {
  size: number;
  current: number;
  order?: "asc" | "desc";
  orderField?: Exclude<keyof T, "id">;
}

export interface PRes<T> {
  current: number;
  list: Array<T>;
  size: number;
  total: number;
}

export type APIParam<T extends (params: any) => Promise<any>> = Parameters<T>["0"];
