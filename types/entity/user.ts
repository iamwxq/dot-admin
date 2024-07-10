import type { GenderEnum } from "#/enums/entity";

export interface UserInfo {
  username: string;
  email: string;
  phone: string;
  gender: GenderEnum;
  age: number;
}
