import { useRef } from "react";

import { ProTableUtil } from "@/utils/cls";
import { userPageApi } from "@/apis/features/user";
import ProTable from "@/components/pro-table";
import styles from "@/pages/sys/login/login.module.scss";
import type { UserInfo } from "#/entities/user";
import type { ProColumnsProps, ProTableRef } from "#/components/pro-table";
import type { APIParam } from "#/api";

function Login() {
  const _table = useRef<ProTableRef<UserInfo>>(null);

  const columns: ProColumnsProps<UserInfo> = [
    {
      title: "用户名",
      dataIndex: "username",
      search: {
        type: "input",
        props: {},
      },
    },
    {
      title: "年龄",
      dataIndex: "age",
      search: {
        label: "年龄(age)",
        type: "input-number",
        props: {},
      },
    },
    {
      title: () => <div>邮箱</div>,
      dataIndex: "email",
      search: {
        type: "input",
        props: {},
      },
    },
    {
      title: "性别",
      dataIndex: "gender",
      enum: ProTableUtil.getEnum("gender", { 2: { disabled: true } }),
      search: {
        type: "select",
        props: {},
      },
    },
    {
      title: "手机号",
      dataIndex: "phone",
      search: {
        order: 2,
        type: "input",
        props: {},
      },
    },
    {
      title: "生日",
      dataIndex: "birthday",
      search: {
        order: 1,
        type: "date-picker",
        props: {},
      },
    },
  ];

  return (
    <div className={styles["login-container"]}>
      <ProTable
        ref={_table}
        interact
        columns={columns}
        expandable={{
          expandedRowRender: (record: UserInfo) => <>{record.id}</>,
          rowExpandable: (record: UserInfo) => record.gender === 0,
        }}
        request={{
          // auto: false,
          // instant: false,
          api: userPageApi,
          key: "users/page",
          params: {
            order: "desc",
            orderField: "age",
          } as APIParam<typeof userPageApi>,
        }}
      />
    </div>
  );
};

export default Login;
