import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { queryOptions, useQueries, useQuery } from "@tanstack/react-query";
import styles from "@/styles/pages/Home.module.scss";
import { dateFormat, execDownload } from "@/utils";
import { useGlobalStore } from "@/stores/global";
import { SecsEnum } from "#/enums/time";
import { DateFormatEnum } from "#/enums/format";
import { loginApi, logoutApi } from "@/apis/features/auth";
import type { LoginParams } from "@/apis/features/auth/interface";
import IconButton from "@/components/icons/icon-button";

function Home() {
  const [now, setNow] = useState(() => Date.now());

  const layout = useGlobalStore.use.layout();
  const switchLayout = useGlobalStore.use.switchLayout();

  const username: string = "admin";
  const password: string = "dot001";

  useQuery(handleLogin({ username, password }));
  useQueries({
    queries: [
      handleLogin({ username, password: "dot002" }),
      handleLogin({ username: "admin2", password }),
    ],
  });

  function handleLogin(params: LoginParams) {
    return queryOptions({
      queryKey: ["login", params],
      queryFn: ({ queryKey }) => {
        const [_, params] = queryKey;
        if (typeof params !== "string")
          return loginApi(params);
      },
      staleTime: SecsEnum.S10,
      retry: false,
    });
  }

  async function handleSwitchLayout() {
    await loginApi({ username: "admin", password: "dot001" });

    if (layout === "horizontal")
      switchLayout("vertical");
    else switchLayout("horizontal");
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, SecsEnum.S1);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      {dateFormat(now, DateFormatEnum.HHmmss)}

      <ul>
        <li>hi</li>
        <li>wow</li>
        <li>你好</li>
        <li>苹方</li>
      </ul>

      <div>
        <Camera className={styles.camera} color="#ffadff" />
      </div>

      <div>{layout}</div>

      <div>
        <button type="button" onClick={handleSwitchLayout}>click it</button>
        <button type="button" onClick={logoutApi}>logout</button>
        <button
          type="button"
          onClick={() => execDownload(loginApi, "test", [{ username: "admin", password: "dot001" }])}
        >
          download
        </button>
        <IconButton icon={<Camera className={styles.camera} color="#fff" />} type="primary">
          vertical
        </IconButton>
      </div>
    </div>
  );
}

export default Home;
