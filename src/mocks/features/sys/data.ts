import faker from "@/mocks/faker";
import type { SignInRes } from "@/apis/features/sys";
import { UsableStatusEnum } from "#/enums/sys";

export function signInRes(): SignInRes {
  const exp = Math.floor(Date.now() / 1000) + (60 * 60);
  const user: SignInRes["user"] = {
    id: faker.string.uuid(),
    age: Math.floor(Math.random() * 99 + 1),
    gender: Math.floor(Math.random() * 3),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    avatar: "https://images.pexels.com/photos/50577/hedgehog-animal-baby-cute-50577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: UsableStatusEnum.ENABLE,
    role: {
      order: 1,
      id: faker.string.numeric(10),
      name: "Admin",
      label: "superadmin",
      status: UsableStatusEnum.ENABLE,
      description: "dot-admin super administrator",
    },
  };

  const accessToken = btoa(JSON.stringify({
    signature: "access",
    id: user.id,
    email: user.email,
    username: user.username,
    exp,
  }));

  const refreshToken = btoa(JSON.stringify({
    signature: "refresh",
    id: user.id,
    email: user.email,
    username: user.username,
    exp,
  }));

  return { accessToken, refreshToken, user };
}
