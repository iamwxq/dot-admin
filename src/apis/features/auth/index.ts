import type { LoginParams, LoginRes } from "./interface";
import { AuthUrl } from "./url";
import http from "@/apis";

export function loginApi(data: LoginParams) {
  return http.post<LoginRes>(AuthUrl.Login, data);
}

export function logoutApi() {
  return http.post<null>(AuthUrl.Logout);
}
