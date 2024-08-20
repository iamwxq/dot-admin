import { dicts } from "@/utils/dicts";
import type { ColumnEnum } from "#/components/pro-table";

type Dict = keyof typeof dicts;
type Options<T extends Dict> = { [K in keyof typeof dicts[T]]?: Omit<ColumnEnum, "label" | "value"> };

export class ProTableUtil {
  private constructor() {}

  public static getEnum<T extends Dict>(name: T, options?: Options<T>) {
    const e: Array<ColumnEnum> = [];
    const dict = dicts[name];

    for (const [k, label] of Object.entries(dict)) {
      const value = <keyof typeof dicts[T]>(Number.isNaN(Number(k)) ? k : Number(k));
      e.push({ value, label, ...options?.[value] });
    }

    return e;
  }

  public static getDict(name: Dict) {
    return dicts[name];
  }
}
