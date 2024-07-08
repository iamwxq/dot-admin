import { internet, string } from "@/mocks/faker";
import type { LoginRes } from "@/apis/features/auth/interface";

export function loginRes(): LoginRes {
  const accessToken = btoa(JSON.stringify({
    id: string.uuid(),
    signature: "access",
    email: internet.email(),
    username: internet.userName(),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }));

  const refreshToken = btoa(JSON.stringify({
    id: string.uuid(),
    signature: "refresh",
    email: internet.email(),
    username: internet.userName(),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }));

  return { accessToken, refreshToken };
}
