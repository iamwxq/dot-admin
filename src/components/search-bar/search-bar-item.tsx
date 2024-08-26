import {
  DatePicker,
  Input,
  InputNumber,
  Select,
  TimePicker,
} from "antd";
import type {
  DatePickerProps,
  InputNumberProps,
  InputProps,
  SelectProps,
  TimePickerProps,
} from "antd";
import type { ColumnEnum, SearchType } from "#/components/pro-table";

interface SearchBarItemProps {
  el: SearchType["type"];
  em?: Array<ColumnEnum>;
  props?: SearchType["props"];
}

const InputDefaultProps: InputProps = {
  placeholder: "请输入",
  allowClear: true,
};

const InputNumberDefaultProps: InputNumberProps = {
  placeholder: "请输入",
};

const SelectDefaultProps: SelectProps = {
  placeholder: "请选择",
  allowClear: true,
};

const DatePickerDefaultProps: DatePickerProps = {
  placeholder: "请选择",
  allowClear: true,
};

const TimePickerDefaultProps: TimePickerProps = {
  placeholder: "请选择",
  allowClear: true,
};

function SearchBarItem({ el, em, props }: SearchBarItemProps) {
  if (el === "input-number")
    return <InputNumber {...({ ...InputNumberDefaultProps, ...props } as InputNumberProps)} />;

  if (el === "select")
    return <Select options={em} {...({ ...SelectDefaultProps, ...props } as SelectProps)} />;

  if (el === "date-picker")
    return <DatePicker {...({ ...DatePickerDefaultProps, ...props } as DatePickerProps)} />;

  if (el === "time-picker")
    return <TimePicker {...({ ...TimePickerDefaultProps, ...props } as TimePickerProps)} />;

  return <Input {...({ ...InputDefaultProps, ...props } as InputProps)} />;
};

export default SearchBarItem;
