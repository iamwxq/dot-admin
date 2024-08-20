import type { CodeEnum } from "#/enums/http";
import type { DataKey } from "#/components/pro-table";

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
  size: number;
  total: number;
  current: number;
  list: Array<T & DataKey>;
}
