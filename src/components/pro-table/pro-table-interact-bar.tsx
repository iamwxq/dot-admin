import type { ProTableInteractButtons } from "#/components/pro-table.ts";
import type { ReactNode } from "react";
import styles from "@/components/pro-table/pro-table.module.scss";
import ProTableActions from "@/components/pro-table/pro-table-actions";

interface ProTableInteractBarProps {
  buttons?: ProTableInteractButtons;
  title?: ReactNode;
  dataLoading?: boolean;
  onDataRefresh?: () => void;
  onEnableSearch?: () => void;
}

function ProTableInteractBar({
  title,
  buttons,
  dataLoading,
  onDataRefresh,
  onEnableSearch,
}: ProTableInteractBarProps) {
  return (
    <div className={styles["title-container"]}>
      <section className={styles.title}>{title}</section>

      <ProTableActions
        buttons={buttons}
        loading={dataLoading}
        onEnableSearch={onEnableSearch}
        onRefresh={onDataRefresh}
      />
    </div>
  );
}

export default ProTableInteractBar;
