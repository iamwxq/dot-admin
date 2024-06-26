import type { CodeEnum } from "@/enums/http";

export interface Result<T = any> {
  code: CodeEnum;
  message: string;
  data: T | null;
}
