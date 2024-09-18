import type { ColumnEnum } from "#/components/pro-table";
import { dicts } from "@/utils/dicts";

type Dict = keyof typeof dicts;
type ValueOfDict<T extends Dict> = keyof typeof dicts[T];
type Options<T extends Dict> = { [K in ValueOfDict<T>]?: Omit<ColumnEnum, "label" | "value"> };

export class ProTableUtil {
  private constructor() {}

  public static getEnum<T extends Dict>(name: T, options?: Options<T>) {
    const e: Array<ColumnEnum> = [];
    const dict = dicts[name];

    for (const [k, label] of Object.entries(dict)) {
      const value = <Exclude<keyof typeof dicts[T], symbol>>(Number.isNaN(Number(k)) ? k : Number(k));
      e.push({ value, label, ...options?.[value] });
    }

    return e;
  }

  public static getDict(name: Dict) {
    return dicts[name];
  }
}
