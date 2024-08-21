import { isEmpty } from "ramda";
import { Flex, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { Ref } from "react";
import type { TableProps } from "antd";

import SearchBar from "@/components/search-bar";
import InteractBar from "@/components/interact-bar";
import styles from "@/components/pro-table/pro-table.module.scss";
import type { PRes } from "#/api";
import type { ProColumnsProps, ProTableRef, RecordType } from "#/components/pro-table";

interface ProTableRequest<T extends RecordType> {
  auto: boolean;
  key: string;
  api: (params: any) => Promise<PRes<T>>;

  params?: Record<string, any>;
}

interface ProTableProps<T extends RecordType> extends TableProps<T> {
  columns?: ProColumnsProps<T>;
  interact?: boolean;
  request?: ProTableRequest<T>;
}

const DefaultRowKey = "id";
const DefaultPageSize = 10;
const DefaultPaginationProps: TableProps["pagination"] = {
  position: ["bottomCenter"],
};

function UnforwardProTable<T extends RecordType = object>({
  className: clsn,
  columns: cols,
  dataSource: ds,
  interact = true,
  pagination: pgn,
  rowKey: rk,

  request,

  ...props
}: ProTableProps<T>, ref: Ref<ProTableRef<T>>) {
  const [current, setCurrent] = useState<number>(1);
  const [size, setSize] = useState<number>(DefaultPageSize);

  const queries = cols?.filter(col => col.search) ?? [];
  const className = `${clsn ?? ""} ${styles.table}`.trim();

  const columns = cols?.map((col) => {
    if (!col.enum || col.render)
      return { ...col };

    return {
      ...col,
      render: (value: any) => <>{col.enum!.find(item => item.value === value)?.label ?? (value ?? "-")}</>,
    };
  });

  const { data, refetch } = useQuery({
    queryKey: [request?.key],
    queryFn: () => request?.api({ current, size, ...request.params }),
    enabled: false,
  });
  const dataSource = ds?.length ? ds : data?.list;

  const pagination: TableProps<T>["pagination"] = ({
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
  });

  const rowKey: TableProps<T>["rowKey"] = rk || (dataSource?.length
    ? Object.hasOwn(dataSource[0], DefaultRowKey) ? DefaultRowKey : undefined
    : undefined);

  useImperativeHandle(ref, () => ({
    data: data?.list,
    refetch,
  }), [data, refetch]);

  useEffect(() => {
    if (!request || !columns)
      return;

    const { auto } = request;
    if (!ds && auto)
      refetch();
  }, [current, size, request]);

  return (
    <div className={styles["pro-table__container"]}>
      <Flex vertical align="center" gap="24px" justify="center">
        {!isEmpty(queries) && <SearchBar items={queries} />}

        {interact && <InteractBar />}

        <Table<T>
          className={className}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          rowKey={rowKey}
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
