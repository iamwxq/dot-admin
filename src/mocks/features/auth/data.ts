import { internet, string } from "@/mocks/faker";
import type { LoginRes } from "@/apis/features/auth/interface";

export function loginData(): LoginRes {
  const payload = {
    id: string.uuid(),
    signature: "dot-admin",
    email: internet.email(),
    username: internet.userName(),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  };

  return { token: btoa(JSON.stringify(payload)) };
}
