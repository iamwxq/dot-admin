import type { UserInfo, UserToken } from "#/entities/user";
import { HttpRequest } from "@/apis";

const http = HttpRequest.getInstance();

export enum AuthUrl {
  SIGN_IN = "/auth/signin",
  LOGOUT = "/auth/logout",
}

export type SignInRes = UserToken & { user: UserInfo };
export interface SignInParams {
  username: string;
  password: string;
}

export function signin(data: SignInParams) {
  return http.post<SignInRes>({ url: AuthUrl.SIGN_IN, data });
}

export function logout() {
  return http.post<null>({ url: AuthUrl.LOGOUT });
}
