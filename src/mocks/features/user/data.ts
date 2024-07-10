import type { UserInfo } from "#/entity/user";
import faker from "@/mocks/faker";

export function rowUser(): UserInfo {
  return {
    age: Math.floor(Math.random() * 99 + 1),
    email: faker.internet.email(),
    gender: Math.floor(Math.random() * 3),
    phone: faker.phone.number(),
    username: faker.internet.userName(),
  };
}
