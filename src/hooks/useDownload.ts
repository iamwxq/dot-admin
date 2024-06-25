import { useNotification } from "@/context/notification";

export async function useDownload(
  api: (...args: any) => Promise<any>,
  filename: string,
  params?: Parameters<typeof api>,
  notify: boolean = true,
  fileType: string = ".xlsx",
) {
  const notification = useNotification();

  if (notify) {
    notification.info({
      message: "温馨提示",
      description: "如果数据庞大会导致下载缓慢哦，请您耐心等待！",
      placement: "topRight",
    });
  }

  try {
    const res = await api(params);
    const blob = new Blob([res]);

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
