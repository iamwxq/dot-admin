import { isEmpty } from "ramda";
import { Flex, Table } from "antd";
import type { TableProps } from "antd";
import type { ProColumnsProps, RecordType } from "#/components/pro-table";
import SearchBar from "@/components/search-bar";
import styles from "@/styles/components/pro-table.module.scss";

interface ProTableProps<T extends RecordType> extends TableProps<T> {
  columns: ProColumnsProps<T>;
}

const DefaultRowKey = "id";
const DefaultPaginationProps: TableProps["pagination"] = {
  position: ["bottomCenter"],
};

function ProTable<T extends RecordType = object>({
  className: clsn,
  columns: cols,
  dataSource,
  pagination: pgn,
  rowKey: rk,

  ...props
}: ProTableProps<T>) {
  const className = `${clsn ?? ""} ${styles.table}`.trim();
  const queries = cols?.filter(col => col.search) ?? [];
  const columns = cols.map((col) => {
    if (col.enum && !col.render) {
      col.render = (value: any) => <>{col.enum!.find(item => item.value === value)?.label ?? (value ?? "-")}</>;
    }
    return col;
  });
  const pagination: TableProps<T>["pagination"] = ({ ...DefaultPaginationProps, ...(pgn ?? {}) });
  const rowKey: TableProps<T>["rowKey"] = rk || (dataSource && dataSource.length
    ? Object.hasOwn(dataSource[0], DefaultRowKey) ? DefaultRowKey : undefined
    : undefined);

  return (
    <div className={styles.container}>
      <Flex vertical align="center" gap="24px" justify="center">
        {!isEmpty(queries) && <SearchBar items={queries} />}

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

export default ProTable;
