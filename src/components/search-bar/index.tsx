import { Flex } from "antd";
import type { ProColumnType, ProColumnsProps, RecordType } from "#/components/pro-table";
import SearchBarItem from "@/components/search-bar/search-bar-item";
import styles from "@/components/search-bar/search-bar.module.scss";

interface SearchBarProps<T extends RecordType> {
  items: ProColumnsProps<T>;
}

function SearchBar<T extends RecordType>({
  items,
}: SearchBarProps<T>) {
  const cols = items.map((col: ProColumnType<T>) => ({ ...col, search: col.search! }));

  return (
    <div className={styles.container}>
      <Flex align="center" className={styles.ul} gap="20px">
        {cols.map(col => (
          <Flex
            key={col.dataIndex?.toString()}
            align="center"
            className={styles.li}
            gap="8px"
          >
            <div className={styles.label}>
              {typeof col.title === "function" ? col.title({}) : col.title}:
            </div>

            {typeof col.search === "boolean" ? <SearchBarItem el="input" /> : <SearchBarItem el={col.search.type} props={col.search.props} />}
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default SearchBar;
