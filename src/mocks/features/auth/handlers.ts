import { HttpResponse, http } from "msw";
import type { HttpHandler } from "msw";
import { fail, success } from "@/mocks";
import { CodeEnum } from "@/enums/http";
import { AuthUrl } from "@/apis/features/auth/url";
import { loginData } from "@/mocks/features/auth/data";
import type { LoginParams } from "@/apis/features/auth/interface";

/**
 * @description 登录
 */
const login: HttpHandler = http.post(AuthUrl.Login, async ({ request }) => {
  const payload = await request.json() as LoginParams;

  if (payload.username === "admin" && payload.password === "dot001")
    return HttpResponse.json(success(loginData(), "登陆成功"));

  if (payload.username !== "admin")
    return HttpResponse.json(fail("账号不存在", CodeEnum.OVERDUE));

  if (payload.password !== "dot001")
    return HttpResponse.json(fail("密码错误", CodeEnum.OVERDUE));
});

/**
 * @description 登出
 */
const logout: HttpHandler = http.post(AuthUrl.Logout, () => {
  return HttpResponse.json(success());
});

const handlers: HttpHandler[] = [
  login,
  logout,
];

export default handlers;
