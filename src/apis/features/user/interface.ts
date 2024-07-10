import type { PParams, PRes } from "#/api";
import type { UserInfo } from "#/entity/user";

export interface UserPageParams extends PParams<UserInfo> {}

export interface UserPageRes extends PRes<UserInfo> {}
