import type { UserPageParams, UserPageRes } from "./interface";
import { UserUrl } from "./url";
import { http } from "@/apis";

export function userPageApi(params: UserPageParams) {
  return http.get<UserPageRes>(UserUrl.Page, params);
}
