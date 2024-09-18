import type { UserInfo } from "#/entities/user";
import { DateFormatEnum } from "#/enums/format";
import faker from "@/mocks/faker";
import { dateFormat } from "@/utils";

export function userRow(): UserInfo {
  return {
    id: faker.string.uuid(),
    age: Math.floor(Math.random() * 99 + 1),
    email: faker.internet.email(),
    gender: Math.floor(Math.random() * 3),
    phone: faker.phone.number(),
    username: faker.internet.userName(),
    birthday: dateFormat(faker.date.birthdate(), DateFormatEnum.YYYYMMDD),
  };
}
