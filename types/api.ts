import type { CodeEnum } from "@/enums/http";

export interface Result<T = any> {
  msg: string;
  code: CodeEnum;
  data: T | null;
}

export interface PParams<T> {
  size: number;
  current: number;
  order: "asc" | "desc";
  orderField: Exclude<keyof T, "id">;
}

export interface PRes<T> {
  list: T[];
  size: number;
  total: number;
  current: number;
}
