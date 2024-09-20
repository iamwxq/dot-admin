import type { UserInfo } from "#/entities/user";
import type { UserPageRes } from "@/apis/features/user";
import type { HttpHandler } from "msw";
import { UserUrl } from "@/apis/features/user";
import { HttpMock } from "@/mocks";
import { HttpResponse } from "msw";
import { userRow } from "./data";

const userPage: HttpHandler = HttpMock.get(UserUrl.PAGE, ({ request }) => {
  const url = new URL(request.url);
  const params = url.searchParams;

  const size = Number(params.get("size"));
  const current = Number(params.get("current"));

  const data: Array<UserInfo> = [];
  for (let i = 0; i < size; i++) {
    const user = userRow();
    data.push(user);
  }

  const response: UserPageRes = {
    size,
    current,
    list: data,
    total: 100,
  };

  return HttpResponse.json(HttpMock.success(response));
});

const handlers: Array<HttpHandler> = [userPage];

export default handlers;
