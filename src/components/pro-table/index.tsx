import type { PRes } from "#/api";
import type {
  ProColumnsProps,
  ProTableInteractButtons,
  ProTableRef,
  RecordType,
} from "#/components/pro-table";
import type { SearchBarRef } from "#/components/search-bar";
import type { TableProps } from "antd";
import type { Ref } from "react";
import styles from "@/components/pro-table/pro-table.module.scss";
import ProTableInteractBarComp from "@/components/pro-table/pro-table-interact-bar.tsx";
import SearchBar from "@/components/search-bar";
import { usePrevious } from "@reactuses/core";
import { useQuery } from "@tanstack/react-query";
import { Flex, Table } from "antd";
import { equals, isEmpty, isNil } from "ramda";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";

interface ProTableRequest<T extends RecordType> {
  key: string;
  api: (params: any) => Promise<PRes<T>>;

  auto?: boolean;
  instant?: boolean;
  params?: Record<string, any>;
}

interface ProTableProps<T extends RecordType> extends TableProps<T> {
  columns?: ProColumnsProps<T>;
  interact?: {
    buttons?: ProTableInteractButtons;
  } | boolean;
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

  request,
  interact: _interact,

  ...props
}: ProTableProps<T>, ref: Ref<ProTableRef<T>>) {
  const [render, setRender] = useState(true);
  const [current, setCurrent] = useState<number>(1);
  const [enable, setEnable] = useState<boolean>(true); // to control search bar enable status
  const [size, setSize] = useState<number>(DefaultPageSize);
  const [params, setParams] = useState<RecordType>(request?.params ?? {});
  const $params = usePrevious(params); // record previous params to compare and decide whether refetch data

  const _search = useRef<SearchBarRef<any>>(null);

  const queries = useMemo(() => cols?.filter(col => col.search) ?? [], [cols]);
  const className = useMemo(() => `${clsn ?? ""} ${styles.table}`.trim(), [clsn]);

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

  const ProTableInteractBar = useMemo(() => {
    const show = isNil(_interact)
      || _interact === true
      || typeof _interact !== "boolean";

    const buttons = show && (_interact as Exclude<ProTableProps<T>["interact"], boolean>)?.buttons;

    return show
      ? () => (
          <ProTableInteractBarComp
            buttons={buttons}
            dataLoading={isFetching}
            onDataRefresh={refetch}
            onEnableSearch={() => setEnable(e => !e)}
          />
        )
      : undefined;
  }, [_interact, isFetching, refetch]);

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

  useImperativeHandle(ref, () => ({
    refetch,
    data: data?.list,
  }), [data, refetch]);

  useEffect(() => {
    setRender(false);
  }, []);

  useEffect(() => {
    if (!request)
      return;

    const { auto } = request;
    if (!ds && (isNil(auto) || auto))
      refetch();
  }, [current, size, request]);

  useEffect(() => {
    if (!request || render || equals($params, params))
      return;

    const { instant } = request;
    if (!ds && (isNil(instant) || instant))
      refetch();
  }, [params]);

  return (
    <div className={styles["pro-table__container"]}>
      <Flex vertical align="center" gap="24px" justify="center">
        {!isEmpty(queries) && enable && (
          <SearchBar
            ref={_search}
            items={queries}
            listen={_params => setParams(_params)}
            params={request?.params}
          />
        )}

        {ProTableInteractBar && <ProTableInteractBar />}

        <Table<T>
          className={className}
          columns={columns}
          dataSource={dataSource}
          loading={isFetching}
          pagination={pagination}
          rowKey={rowKey}
          {...props}
        />
      </Flex>
    </div>
  );
}

// TODO: fix it
// how to make a forward component generic???
const ProTable = forwardRef(UnforwardProTable<any>);

export default ProTable;
