import type { ColumnEnum, SearchType } from "#/components/pro-table";
import type {
  DatePickerProps,
  InputNumberProps,
  InputProps,
  SelectProps,
  TimePickerProps,
} from "antd";
import { MSecsEnum } from "#/enums/time";
import { useDebounceFn } from "@reactuses/core";
import {
  DatePicker,
  Input,
  InputNumber,
  Select,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface SearchBarItemProps {
  el: SearchType["type"];
  dataIndex: string;
  value: any;
  onChange: (value: any) => void;
  onListen: () => void;

  em?: Array<ColumnEnum>;
  props?: SearchType["props"];
}

const InputDefaultProps: InputProps = {
  placeholder: "请输入",
  allowClear: true,
};

const InputNumberDefaultProps: InputNumberProps = {
  controls: true,
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

function SearchBarItem({
  el,
  em,
  props,
  value: _value,
  onChange,
  onListen,
}: SearchBarItemProps) {
  const [value, setValue] = useState<any>(_value);
  const { run } = useDebounceFn(() => onChange(value), MSecsEnum.MS300);

  useEffect(() => {
    switch (el) {
      case "input":
      case "input-number":
        run();
        break;

      default:
        onChange(value);
        break;
    }
  }, [value, el]);

  if (el === "input-number") {
    return (
      <InputNumber
        value={value}
        onChange={value => setValue(value)}
        {...({ ...InputNumberDefaultProps, ...props } as InputNumberProps)}
      />
    );
  }

  if (el === "select") {
    return (
      <Select
        options={em}
        value={value}
        onChange={value => setValue(value)}
        {...({ ...SelectDefaultProps, ...props } as SelectProps)}
      />
    );
  }

  if (el === "date-picker") {
    return (
      <DatePicker
        value={value ? dayjs(value) : undefined}
        onChange={value => setValue(value)}
        {...({ ...DatePickerDefaultProps, ...props } as DatePickerProps)}
      />
    );
  }

  if (el === "time-picker") {
    return (
      <TimePicker
        value={value ? dayjs(value) : undefined}
        onChange={value => setValue(value)}
        {...({ ...TimePickerDefaultProps, ...props } as TimePickerProps)}
      />
    );
  }

  return (
    <Input
      value={value}
      onChange={value => setValue(value.target.value)}
      {...({ ...InputDefaultProps, ...props } as InputProps)}
    />
  );
};

export default SearchBarItem;
