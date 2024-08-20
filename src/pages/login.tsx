import { useQuery } from "@tanstack/react-query";
import styles from "@/styles/pages/login.module.scss";
import ProTable from "@/components/pro-table";
import type { ProColumnsProps } from "#/components/pro-table";
import { userPageApi } from "@/apis/features/user";
import type { UserInfo } from "#/entity/user";
import { ProTableUtil } from "@/utils/cls";

function Login() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => userPageApi({ current: 1, size: 10 }),
  });

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
    <div className={styles.container}>
      <ProTable
        columns={columns}
        dataSource={data?.list}
        pagination={{ total: data?.total }}
      />
    </div>
  );
};

export default Login;
