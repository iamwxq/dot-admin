import { isEmpty } from "ramda";
import { Flex, Table } from "antd";
import type { TableProps } from "antd";
import type { ProColumnsProps, RecordType } from "#/components/pro-table";
import SearchBar from "@/components/search-bar";
import styles from "@/styles/components/pro-table.module.scss";

interface ProTableProps<T extends RecordType> extends TableProps<T> {
  columns: ProColumnsProps<T>;
}

const PaginationDefaultProps: TableProps["pagination"] = {
  position: ["bottomRight"],
};

function ProTable<T extends RecordType = object>({
  className: clsn,
  columns,
  pagination: pg,

  ...props
}: ProTableProps<T>) {
  const pagination = pg
    ? ({ ...PaginationDefaultProps, ...pg }) as TableProps<T>["pagination"]
    : PaginationDefaultProps as TableProps<T>["pagination"];
  const className = `${clsn ?? ""} ${styles.table}`.trim();
  const queries = columns?.filter(col => col.search) ?? [];

  return (
    <div className={styles.container}>
      <Flex vertical align="center" gap="24px" justify="center">
        {!isEmpty(queries) && <SearchBar items={queries} />}

        <Table
          className={className}
          columns={columns}
          pagination={pagination}
          {...props}
        />
      </Flex>
    </div>
  );
};

export default ProTable;
