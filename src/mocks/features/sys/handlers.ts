import { HttpResponse } from "msw";
import type { HttpHandler } from "msw";
import { HttpMock } from "@/mocks";
import { CodeEnum } from "#/enums/http";
import { AuthUrl } from "@/apis/features/sys/url";
import { loginRes } from "@/mocks/features/sys/data";
import type { LoginParams } from "@/apis/features/sys/interface";

/**
 * @description 登录
 */
const login: HttpHandler = HttpMock.post(AuthUrl.Login, async ({ request }) => {
  const payload = await request.json() as LoginParams;

  if (payload.username === "admin" && payload.password === "288c33d314ab3c6a73b7768a6df2ddfd")
    return HttpResponse.json(HttpMock.success(loginRes()));

  if (payload.username !== "admin")
    return HttpResponse.json(HttpMock.fail("账号不存在", CodeEnum.OVERDUE));

  if (payload.password !== "288c33d314ab3c6a73b7768a6df2ddfd")
    return HttpResponse.json(HttpMock.fail("密码错误", CodeEnum.OVERDUE));
});

/**
 * @description 登出
 */
const logout: HttpHandler = HttpMock.post(AuthUrl.Logout, () => {
  return HttpResponse.json(HttpMock.success());
});

const handlers: HttpHandler[] = [
  login,
  logout,
];

export default handlers;
