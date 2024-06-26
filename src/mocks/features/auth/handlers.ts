import { HttpResponse, http } from "msw";
import type { HttpHandler } from "msw";
import { fail, success } from "@/mocks";
import { url } from "@/apis/features/auth/url";
import { token } from "@/mocks/features/auth/data";
import type { LoginParams, LoginRes } from "@/apis/features/auth/interface";

/**
 * @description 登录
 */
const login: HttpHandler = http.post(url.login, async ({ request }) => {
  const payload = await request.json() as LoginParams;

  if (payload.account === "admin" && payload.password === "dot001")
    return HttpResponse.json(success({ token } as LoginRes, "登陆成功"));

  if (payload.account !== "admin")
    return HttpResponse.json(fail("账号不存在"));

  if (payload.password !== "dot001")
    return HttpResponse.json(fail("密码错误"));
});

const logout: HttpHandler = http.post(url.logout, () => {
  return HttpResponse.json(success());
});

const handlers: HttpHandler[] = [
  login,
  logout,
];

export default handlers;
