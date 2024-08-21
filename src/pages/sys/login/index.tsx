import { useRef } from "react";

import { ProTableUtil } from "@/utils/cls";
import { userPageApi } from "@/apis/features/user";
import ProTable from "@/components/pro-table";
import styles from "@/pages/sys/login/login.module.scss";
import type { UserPageParams } from "@/apis/features/user";
import type { UserInfo } from "#/entities/user";
import type { ProColumnsProps, ProTableRef } from "#/components/pro-table";

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
        type: "input-number",
        props: {},
      },
    },
    {
      title: "邮箱",
      dataIndex: "email",
      search: {
        type: "input",
        props: {},
      },
    },
    {
      title: "性别",
      dataIndex: "gender",
      enum: ProTableUtil.getEnum("gender"),
      search: {
        type: "select",
        props: {},
      },
    },
    {
      title: "手机号",
      dataIndex: "phone",
      search: {
        type: "input",
        props: {},
      },
    },
  ];

  return (
    <div className={styles["login-container"]}>
      <ProTable
        ref={_table}
        columns={columns}
        request={{
          auto: true,
          key: "users/page",
          params: {
            order: "desc",
            orderField: "age",
          } as UserPageParams,
          api: userPageApi,
        }}
      />
    </div>
  );
};

export default Login;
