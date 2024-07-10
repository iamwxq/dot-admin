import { HttpResponse } from "msw";
import type { HttpHandler } from "msw";
import { rowUser } from "./data";
import { HttpMock } from "@/mocks";
import { UserUrl } from "@/apis/features/user/url";
import type { UserPageRes } from "@/apis/features/user/interface";
import type { UserInfo } from "#/entity/user";

const userPage: HttpHandler = HttpMock.get(UserUrl.Page, ({ request }) => {
  const url = new URL(request.url);

  const size = Number(url.searchParams.get("size"));
  const current = Number(url.searchParams.get("current"));

  const data: UserInfo[] = [];
  for (let i = 0; i < size; i++) data.push(rowUser());

  return HttpResponse.json(HttpMock.success({
    size,
    current,
    list: data,
    total: 100,
  } as UserPageRes));
});

const handlers: HttpHandler[] = [
  userPage,
];

export default handlers;
