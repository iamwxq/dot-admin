import type { PParam, PRes } from "#/api";
import type { UserInfo } from "#/entity/user";

export interface UserPageParams extends PParam<UserInfo> {}

export interface UserPageRes extends PRes<UserInfo> {}
