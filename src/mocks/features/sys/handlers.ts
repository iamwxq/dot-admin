import type { SignInParams } from "@/apis/features/sys";
import type { HttpHandler } from "msw";
import { CodeEnum } from "#/enums/http";
import { AuthUrl } from "@/apis/features/sys";
import { HttpMock } from "@/mocks";
import { HttpResponse } from "msw";
import { signInRes } from "./data";

/**
 * @description 登录
 */
const signin: HttpHandler = HttpMock.post(AuthUrl.SIGNIN, async ({ request }) => {
  const payload = await request.json() as SignInParams;

  if (payload.username === "admin" && payload.password === "288c33d314ab3c6a73b7768a6df2ddfd")
    return HttpResponse.json(HttpMock.success(signInRes()));

  if (payload.username !== "admin")
    return HttpResponse.json(HttpMock.fail("账号不存在", CodeEnum.OVERDUE));

  if (payload.password !== "288c33d314ab3c6a73b7768a6df2ddfd")
    return HttpResponse.json(HttpMock.fail("密码错误", CodeEnum.OVERDUE));
});

/**
 * @description 登出
 */
const logout: HttpHandler = HttpMock.post(AuthUrl.LOGOUT, () => {
  return HttpResponse.json(HttpMock.success());
});

const handlers: HttpHandler[] = [
  signin,
  logout,
];

export default handlers;
