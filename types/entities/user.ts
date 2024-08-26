import type { GenderEnum } from "#/enums/entity";
import type { UsableStatusEnum } from "#/enums/sys";
import type { Role } from "#/sys";

export interface UserToken {
  accessToken?: string;
  refreshToken?: string;
}

export interface UserInfo {
  id: string;
  age: number;
  gender: GenderEnum;
  email: string;
  phone: string;
  username: string;
  password?: string;
  avatar?: string;
  role?: Role;
  status?: UsableStatusEnum;
  birthday?: string;
  // permission?: unknown;
}
