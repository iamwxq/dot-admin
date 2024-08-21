import { App } from "antd";
import { useState } from "react";

type CopiedValue = string | null;
type CopyFn = (txt: string) => Promise<boolean>;

export function useClipBoard(): {
  text: CopiedValue;
  copy: CopyFn;
} {
  const { notification } = App.useApp();

  const [text, setCopiedTxt] = useState<CopiedValue>(null);

  const copy = async (txt: string): Promise<boolean> => {
    if (!("clipboard" in navigator)) {
      console.warn("当前浏览器不支持 clipboard API");
      return false;
    }
    try {
      await navigator.clipboard.writeText(txt);
      setCopiedTxt(txt);
      notification.success({ message: "复制成功！" });
      return true;
    }
    catch {
      console.warn("复制失败");
      return false;
    }
  };

  return { text, copy };
}
