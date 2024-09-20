import type { PParam, PRes } from "#/api";
import type { UserInfo } from "#/entities/user";
import { HttpRequest } from "@/apis";

const http = HttpRequest.getInstance();

export enum UserUrl {
  PAGE = "/users/page",
}

export interface UserPageParams extends PParam<UserInfo> {}
export interface UserPageRes extends PRes<UserInfo> {}

export function userPageApi(params: UserPageParams) {
  const url = UserUrl.PAGE;
  return http.get<UserPageRes>({ url, params });
}
