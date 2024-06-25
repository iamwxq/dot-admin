import dayjs from "dayjs";
import { DateFormatEnum } from "@/enums/format";

/**
 * 用于格式化后端提供的时间
 *
 * @param date 符合 `Dayjs` 构造函数的解析类型, 包括字符串, 毫秒值, `Date` 对象
 * @param formatter 选择日期格式, 默认为 `@enum {DateFormatEnum.YYYYMMDD}`
 * @return 格式化后的日期
 */
export function dateFormat(
  date: string | number | Date,
  formatter: DateFormatEnum = DateFormatEnum.YYYYMMDD,
): string {
  return dayjs(date).format(formatter);
}
