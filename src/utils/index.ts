import dayjs from "dayjs";
import { notification } from "antd";
import { DateFormatEnum } from "@/enums/format";

/**
 * 用于格式化后端提供的时间
 *
 * @param date 符合 `Dayjs` 构造函数的解析类型, 包括字符串, 毫秒值, `Date` 对象
 * @param formatter 选择日期格式, 默认为 `@enum {DateFormatEnum.YYYYMMDDHHmmss}`
 * @return 格式化后的日期
 */
export function dateFormat(
  date: string | number | Date,
  formatter: DateFormatEnum = DateFormatEnum.YYYYMMDDHHmmss,
): string {
  return dayjs(date).format(formatter);
}

/**
 * 调用下载 API
 *
 * @param api 接口
 * @param filename 下载文件名
 * @param params 接口参数
 * @param notify 是否要弹出下载提示气泡
 * @param fileType 文件类型
 *
 * @example useDownload(api, 'user-list', { id }, false, '.pdf');
 */
export async function download<T extends (...args: any) => Promise<any>>(
  api: T,
  filename: string,
  params?: Parameters<typeof api>,
  notify: boolean = true,
  fileType: string = ".xlsx",
) {
  if (notify) {
    notification.info({
      message: "温馨提示",
      description: "如果数据庞大会导致下载缓慢哦，请您耐心等待！",
      placement: "topRight",
    });
  }

  try {
    const buffer = await api(...(params || []));
    const blob = new Blob([buffer]);

    // edge
    const nav = window.navigator as any;
    if ("msSaveOrOpenBlob" in nav)
      return nav.msSaveOrOpenBlob(blob, `${filename}${fileType}`);

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.style.display = "none";
    link.download = `${filename}${fileType}`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
  catch (error) {
    console.error(error);
  }
}
