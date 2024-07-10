import faker from "@/mocks/faker";
import type { LoginRes } from "@/apis/features/sys/interface";

export function loginRes(): LoginRes {
  const accessToken = btoa(JSON.stringify({
    id: faker.string.uuid(),
    signature: "access",
    email: faker.internet.email(),
    username: faker.internet.userName(),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }));

  const refreshToken = btoa(JSON.stringify({
    id: faker.string.uuid(),
    signature: "refresh",
    email: faker.internet.email(),
    username: faker.internet.userName(),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }));

  return { accessToken, refreshToken };
}
