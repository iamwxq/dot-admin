import type { PRes } from "#/api";
import type { useQuery } from "@tanstack/react-query";
import type {
  DatePickerProps,
  InputNumberProps,
  InputProps,
  SelectProps,
  TimePickerProps,
} from "antd";
import type { ColumnType } from "antd/es/table";

interface SearchTypeBase {
  show?: boolean;
  order?: number;
  label?: string;
  key?: string;
}

interface InputSearchType extends SearchTypeBase {
  type: "input";
  props?: InputProps;
}

interface InputNumberSearchType extends SearchTypeBase {
  type: "input-number";
  props?: InputNumberProps;
}

interface SelectSearchType extends SearchTypeBase {
  type: "select";
  props?: SelectProps;
}

interface DatePickerSearchType extends SearchTypeBase {
  type: "date-picker";
  props?: DatePickerProps;
}

interface TimePickerSearchType extends SearchTypeBase {
  type: "time-picker";
  props?: TimePickerProps;
}

export type SearchType =
  | InputSearchType
  | InputNumberSearchType
  | SelectSearchType
  | DatePickerSearchType
  | TimePickerSearchType;

export interface DataKey {
  key: React.Key;
}

export interface ColumnEnum {
  label: string;
  value: string | number;
  disabled?: boolean;
  className?: string;
}

interface CustomColumnType {
  isSearch?: boolean;
  search?: SearchType;
  enum?: Array<ColumnEnum>;
}

export type RecordType = Record<string, any>;

export type ProColumnType<T extends RecordType> = ColumnType<T> & CustomColumnType;
export interface ProColumnGroupType<T extends RecordType> extends Omit<ProColumnType<T>, "dataIndex"> {
  children: ProColumnsType<T>;
};
type ProColumnsType<T extends RecordType> = (ProColumnType<T> | ProColumnGroupType<T>)[];

export type ProColumnsProps<T extends RecordType> = ProColumnsType<T>;

export interface ProTableRef<T extends RecordType> {
  data: Array<T> | undefined;
  refetch: ReturnType<typeof useQuery<PRes<T> | undefined>>["refetch"];
}

export type ProTableInteractButtons = Array<"refresh" | "setting" | "search"> | boolean;
