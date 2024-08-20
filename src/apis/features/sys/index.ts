import { http } from "@/apis";
import type { UserInfo, UserToken } from "#/entities/user";

export enum AuthUrl {
  SIGNIN = "/auth/signin",
  LOGOUT = "/auth/logout",
};

export type SignInRes = UserToken & { user: UserInfo };
export interface SignInParams {
  username: string;
  password: string;
}

export function signin(data: SignInParams) {
  return http.post<SignInRes>({ url: AuthUrl.SIGNIN, data });
}

export function logout() {
  return http.post<null>({ url: AuthUrl.LOGOUT });
}
