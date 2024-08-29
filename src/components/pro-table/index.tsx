import { Flex, Table } from "antd";
import { equals, isEmpty } from "ramda";
import { usePrevious } from "@reactuses/core";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import type { Ref } from "react";
import type { TableProps } from "antd";

import type { PRes } from "#/api";
import type { SearchBarRef } from "#/components/search-bar";
import type { ProColumnsProps, ProTableRef, RecordType } from "#/components/pro-table";

import SearchBar from "@/components/search-bar";
import ProTableTitle from "@/components/pro-table/pro-table-title";
import styles from "@/components/pro-table/pro-table.module.scss";

interface ProTableRequest<T extends RecordType> {
  key: string;
  api: (params: any) => Promise<PRes<T>>;

  auto?: boolean;
  instant?: boolean;
  params?: Record<string, any>;
}

interface ProTableProps<T extends RecordType> extends TableProps<T> {
  columns?: ProColumnsProps<T>;
  interact?: boolean;
  request?: ProTableRequest<T>;
}

// default constants
const DefaultRowKey = "id";
const DefaultPageSize = 10;
const DefaultPaginationProps: TableProps["pagination"] = {
  position: ["bottomCenter"],
};

function UnforwardProTable<T extends RecordType = object>({
  className: clsn,
  columns: cols,
  dataSource: ds,
  pagination: pgn,
  rowKey: rk,

  interact = true,
  request,

  ...props
}: ProTableProps<T>, ref: Ref<ProTableRef<T>>) {
  // states
  const [render, setRender] = useState(true);
  const [current, setCurrent] = useState<number>(1);
  const [size, setSize] = useState<number>(DefaultPageSize);
  const [params, setParams] = useState<RecordType>(request?.params ?? {});
  const $params = usePrevious(params);

  // refs
  const _search = useRef<SearchBarRef<any>>(null);

  const queries = useMemo(() => cols?.filter(col => col.search) ?? [], [cols]);
  const className = useMemo(() => `${clsn ?? ""} ${styles.table}`.trim(), [clsn]);
  const title = useMemo(() => interact === undefined || interact ? ProTableTitle : undefined, [interact]);

  const columns = useMemo(() => cols?.map((col) => {
    if (!col.enum || col.render)
      return { ...col };

    return {
      ...col,
      render: (value: any) => <>{col.enum!.find(item => item.value === value)?.label ?? (value ?? "-")}</>,
    };
  }), [cols]);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["pro-table", request?.key],
    queryFn: () => request?.api({ current, size, ...params }),
    enabled: false,
  });

  const dataSource = useMemo(() => ds?.length ? ds : data?.list, [ds, data]);

  const pagination: TableProps<T>["pagination"] = useMemo(() => ({
    current,
    pageSize: size,
    total: data?.total,
    onChange(page, pageSize) {
      if (page !== current)
        setCurrent(page);

      if (pageSize !== size)
        setSize(pageSize);
    },
    ...DefaultPaginationProps,
    ...pgn,
  }), [data, pgn]);

  const rowKey: TableProps<T>["rowKey"] = useMemo(() => rk || (dataSource?.length
    ? Object.hasOwn(dataSource[0], DefaultRowKey) ? DefaultRowKey : undefined
    : undefined), [rk, dataSource]);

  // handles
  useImperativeHandle(ref, () => ({
    refetch,
    data: data?.list,
  }), [data, refetch]);

  // side effects
  useEffect(() => {
    setRender(false);
  }, []);

  useEffect(() => {
    if (!request)
      return;

    const { auto } = request;
    if (!ds && (auto === undefined || auto))
      refetch();
  }, [current, size, request]);

  useEffect(() => {
    if (!request || render || equals($params, params))
      return;

    const { instant } = request;
    if (!ds && (instant === undefined || instant))
      refetch();
  }, [params]);

  return (
    <div className={styles["pro-table__container"]}>
      <Flex vertical align="center" gap="24px" justify="center">
        {!isEmpty(queries) && (
          <SearchBar
            ref={_search}
            items={queries}
            listen={_params => setParams(_params)}
            params={request?.params}
          />
        )}

        <Table<T>
          className={className}
          columns={columns}
          dataSource={dataSource}
          loading={isFetching}
          pagination={pagination}
          rowKey={rowKey}
          title={title}
          {...props}
        />
      </Flex>
    </div>
  );
};

// TODO: fix it
// how to make a forward component generic???
const ProTable = forwardRef(UnforwardProTable<any>);

export default ProTable;
