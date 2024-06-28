import dayjs from "dayjs";
import { expect, it } from "vitest";
import { dateFormat } from "@/utils";
import { DateFormatEnum } from "#/enums/format";

it("should be YYYY-MM-DD HH:mm:ss", () => {
  const now = new Date();
  expect(dateFormat(now)).toBe(dayjs(now).format(DateFormatEnum.YYYYMMDDHHmmss));
});

it("should be YYYY-MM-DD", () => {
  const now = new Date();
  expect(dateFormat(now, DateFormatEnum.YYYYMMDD)).toBe(dayjs(now).format(DateFormatEnum.YYYYMMDD));
});

it("should be YY-M-D H:m:s", () => {
  const now = new Date();
  expect(dateFormat(now, DateFormatEnum.YYMDHms)).toBe(dayjs(now).format(DateFormatEnum.YYMDHms));
});

it("should be YY-M-D", () => {
  const now = new Date();
  expect(dateFormat(now, DateFormatEnum.YYMD)).toBe(dayjs(now).format(DateFormatEnum.YYMD));
});
