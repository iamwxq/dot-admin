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
import dayjs from "dayjs";
import type { ColumnEnum, SearchType } from "#/components/pro-table";

interface SearchBarItemProps {
  el: SearchType["type"];
  dataIndex: string;
  value: any;
  onChange: (value: any) => void;
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

function SearchBarItem({ el, em, props, value, onChange }: SearchBarItemProps) {
  if (el === "input-number") {
    return (
      <InputNumber
        value={value}
        onChange={value => onChange(value)}
        {...({ ...InputNumberDefaultProps, ...props } as InputNumberProps)}
      />
    );
  }

  if (el === "select") {
    return (
      <Select
        options={em}
        value={value}
        onChange={value => onChange(value)}
        {...({ ...SelectDefaultProps, ...props } as SelectProps)}
      />
    );
  }

  if (el === "date-picker") {
    return (
      <DatePicker
        value={value ? dayjs(value) : undefined}
        onChange={value => onChange(value)}
        {...({ ...DatePickerDefaultProps, ...props } as DatePickerProps)}
      />
    );
  }

  if (el === "time-picker") {
    return (
      <TimePicker
        value={value ? dayjs(value) : undefined}
        onChange={value => onChange(value)}
        {...({ ...TimePickerDefaultProps, ...props } as TimePickerProps)}
      />
    );
  }

  return (
    <Input
      value={value}
      onChange={value => onChange(value.target.value)}
      {...({ ...InputDefaultProps, ...props } as InputProps)}
    />
  );
};

export default SearchBarItem;
