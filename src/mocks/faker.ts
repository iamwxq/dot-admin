import { faker } from "@faker-js/faker/locale/zh_CN";

const zh_CN_Faker = faker;
zh_CN_Faker.seed(Date.now());

export default zh_CN_Faker;
