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
  value: string;
}

interface CustomColumnType {
  search?: boolean | SearchType;
  enum?: ColumnEnum;
}

export type RecordType = Record<string, any>;

export type ProColumnType<T extends RecordType> = ColumnType<T> & CustomColumnType;
export interface ProColumnGroupType<T extends RecordType> extends Omit<ProColumnType<T>, "dataIndex"> {
  children: ProColumnsType<T>;
};
type ProColumnsType<T extends RecordType> = (ProColumnType<T> | ProColumnGroupType<T>)[];

export type ProColumnsProps<T extends RecordType> = ProColumnsType<T>;
