import dayjs from "dayjs";
import { Flex } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { Ref } from "react";

import SearchBarItem from "@/components/search-bar/search-bar-item";
import { DateFormatEnum } from "#/enums/format";
import type { SearchBarRef } from "#/components/search-bar";
import type { ProColumnType, ProColumnsProps, RecordType } from "#/components/pro-table";

import styles from "@/components/search-bar/search-bar.module.scss";
import { filterEmptyProperty } from "@/utils";

interface SearchBarProps<T extends RecordType = any> {
  items: ProColumnsProps<T>;
  params?: T;
  listen?: (params: T) => void;
}

function UnforwardSearchBar<T extends RecordType>({
  items,
  params: _params,
  listen,
}: SearchBarProps<T>, ref: Ref<SearchBarRef<T>>) {
  // props
  const cols = items.map((col: ProColumnType<T>) => ({ ...col, search: col.search! }));
  const props = cols.map((col: ProColumnType<T>) => col.dataIndex) as Array<string>;

  // states
  const [params, setParams] = useState<T>(_params ?? {} as T);

  // methods
  function handleUpdateParams(label: string, value: any) {
    let _value = value;
    if (dayjs.isDayjs(_value))
      _value = dayjs(_value).format(DateFormatEnum.YYYYMMDDHHmmss);

    setParams((prev) => {
      if (!(prev instanceof Object))
        return prev;

      return filterEmptyProperty({ ...prev, [label]: value }) as T;
    });
  }

  // handles
  useImperativeHandle(ref, () => ({
    params,
    search: () => {},
    reset: () => {},
  }), [params]);

  useEffect(() => {
    listen?.(params);
  }, [params]);

  return (
    <div className={styles.container}>
      <Flex align="center" className={styles.ul} gap="20px">
        {cols.map((col, i) => {
          const _default = typeof col.search === "boolean";
          const label = typeof col.title !== "function"
            ? col.title
            : <col.title />;

          return (
            <Flex
              key={col.dataIndex?.toString()}
              align="center"
              className={styles.li}
              gap="8px"
            >
              <div className={styles.label}>
                {label}
              </div>

              <div className={styles["search-item"]}>
                <SearchBarItem
                  dataIndex={props[i]}
                  el={_default ? "input" : col.search.type}
                  em={col.enum}
                  props={col.search.props}
                  value={params[props[i]]}
                  onChange={value => handleUpdateParams(props[i], value)}
                />
              </div>
            </Flex>
          );
        })}
      </Flex>
    </div>
  );
}

const SearchBar = forwardRef(UnforwardSearchBar<any>);

export default SearchBar;
