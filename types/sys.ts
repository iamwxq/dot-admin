import type { UsableStatusEnum } from "./enums/sys";

export interface Role {
  id: string;
  name: string;
  label: string;
  status: UsableStatusEnum;
  order?: number;
  description?: string;
  // permission?: unknown;
}
