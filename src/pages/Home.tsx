import { useEffect, useState } from "react";
import { Camera } from "lucide-react";

import styles from "@/styles/pages/Home.module.scss";

import { dateFormat } from "@/utils";
import { SecsEnum } from "@/enums/time";
import { useGlobalStore } from "@/stores/global";
import { DateFormatEnum } from "@/enums/format";
import { ContentTypeEnum } from "@/enums/http";

function Home() {
  const [now, setNow] = useState(() => Date.now());

  const layout = useGlobalStore.use.layout();
  const switchLayout = useGlobalStore.use.switchLayout();

  function handleSwitchLayout() {
    fetch("http://localhost:23012/sys/auth/login", {
      method: "POST",
      headers: { "Content-Type": ContentTypeEnum.JSON },
      body: JSON.stringify({ account: "admin", password: "dot001" }),
    });

    if (layout === "horizontal")
      switchLayout("vertical");
    else switchLayout("horizontal");
  }

  function logout() {
    fetch("http://localhost:23012/sys/logout", {
      method: "POST",
      headers: { "Content-Type": ContentTypeEnum.JSON },
    });
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
      </ul>

      <div>
        <Camera className={styles.camera} color="#ffadff" />
      </div>

      <div>{layout}</div>

      <div>
        <button type="button" onClick={handleSwitchLayout}>click it</button>
        <button type="button" onClick={logout}>logout</button>
      </div>
    </div>
  );
}

export default Home;
