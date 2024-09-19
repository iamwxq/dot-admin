import type { PParam, PRes } from "#/api";
import type { UserInfo } from "#/entities/user";
import { HttpRequest } from "@/apis";

const http = HttpRequest.getInstance();

export enum UserUrl {
  Page = "/users/page",
}

export interface UserPageParams extends PParam<UserInfo> {}
export interface UserPageRes extends PRes<UserInfo> {}

export function userPageApi(params: UserPageParams) {
  return http.get<UserPageRes>({ url: UserUrl.Page, params });
}
