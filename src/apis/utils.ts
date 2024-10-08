import { notification } from "antd";

/**
 * 调用下载 API
 *
 * @param api 接口 - 建议使用 http 类的 download 方法
 * @param filename 下载文件名
 * @param params 接口参数
 * @param notify 是否要弹出下载提示气泡
 * @param fileType 文件类型
 *
 * @example useDownload(api, 'user-list', { id }, false, '.pdf');
 */
export async function execDownload<T extends (...args: any) => Promise<any>>(
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
