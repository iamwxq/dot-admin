import type { ProTableInteractButtons } from "#/components/pro-table.ts";
import type { ButtonProps } from "antd";
import styles from "@/components/pro-table/pro-table.module.scss";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";

import { Button, Flex } from "antd";
import { useMemo } from "react";

interface ProTableActionsProps {
  buttons?: ProTableInteractButtons;
  loading?: boolean;
  type?: ButtonProps["type"];
  onRefresh?: () => void;
  onEnableSearch?: () => void;
}

function ProTableActions({
  buttons: _btns,
  loading = false,
  type = "default",
  onEnableSearch,
  onRefresh,
}: ProTableActionsProps) {
  const buttons = useMemo(() => Array.isArray(_btns) && Array.from(new Set(_btns)), [_btns]);

  return (
    <div className={styles["actions-container"]}>
      <Flex gap={12}>
        {(buttons === false || buttons.includes("refresh")) && (
          <Button
            disabled={loading}
            icon={<SyncOutlined spin={loading} />}
            shape="circle"
            type={type}
            onClick={onRefresh}
          />
        )}

        {(buttons === false || buttons.includes("search")) && (
          <Button
            disabled={loading}
            icon={<SearchOutlined />}
            shape="circle"
            type={type}
            onClick={onEnableSearch}
          />
        )}
      </Flex>
    </div>
  );
};

export default ProTableActions;
