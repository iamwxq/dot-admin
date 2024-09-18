import type { ProColumnsProps, ProColumnType, RecordType } from "#/components/pro-table";
import type { SearchBarRef } from "#/components/search-bar";
import type { Ref } from "react";
import { DateFormatEnum } from "#/enums/format";

import styles from "@/components/search-bar/search-bar.module.scss";
import SearchBarItem from "@/components/search-bar/search-bar-item";
import { filterEmptyProperty } from "@/utils";
import { Flex } from "antd";

import dayjs from "dayjs";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";

interface SearchBarProps<T extends RecordType = any> {
  items: ProColumnsProps<T>;
  params?: T;
  listen?: (params: T) => void;
}

function _colsSortFn<T extends RecordType>(colA: ProColumnType<T>, colB: ProColumnType<T>): number {
  return (colB.search?.order ?? -1) - (colA.search?.order ?? -1);
}

function UnforwardSearchBar<T extends RecordType>({
  items,
  params: _params,
  listen,
}: SearchBarProps<T>, ref: Ref<SearchBarRef<T>>) {
  // props
  const cols = useMemo(() => items.map((col: ProColumnType<T>) => ({ ...col, search: col.search! })).sort(_colsSortFn), [items]);
  const props = useMemo(() => cols.map((col: ProColumnType<T>) => col.search?.key ?? col.dataIndex) as Array<string>, [items]);

  // states
  const [params, setParams] = useState<T>(_params ?? {} as T);

  // methods
  const handleUpdateParams = useCallback((label: string, value: any) => {
    let _value = value;
    if (dayjs.isDayjs(_value))
      _value = dayjs(_value).format(DateFormatEnum.YYYYMMDDHHmmss);

    setParams((prev) => {
      if (!(prev instanceof Object))
        return prev;

      return filterEmptyProperty({ ...prev, [label]: _value }) as T;
    });
  }, []);

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
          const _key = col.search.key ?? col.dataIndex!.toString();
          const _label = col.search.label ?? (typeof col.title !== "function" ? col.title : <col.title />);

          return (
            <Flex
              key={_key}
              align="center"
              className={styles.li}
              gap="8px"
            >
              <div className={styles.label}>
                {_label}
              </div>

              <div className={styles["search-item"]}>
                <SearchBarItem
                  dataIndex={props[i]}
                  el={col.search.type}
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
