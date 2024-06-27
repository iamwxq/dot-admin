import type { CodeEnum } from "@/enums/http";

export interface Result<T = any> {
  code: CodeEnum;
  message: string;
  data: T | null;
}

export interface PParams<T> {
  current: number;
  size: number;
  orderField: Exclude<keyof T, "id">;
  order: "asc" | "desc";
}

export interface PRes<T> {
  current: number;
  size: number;
  total: number;
  list: T[];
}
