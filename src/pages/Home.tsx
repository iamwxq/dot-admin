import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import styles from "@/styles/pages/Home.module.scss";
import { dateFormat, execDownload } from "@/utils";
import { useGlobalStore } from "@/stores/global";
import { SecsEnum } from "#/enums/time";
import { DateFormatEnum } from "#/enums/format";
import { loginApi, logoutApi } from "@/apis/features/auth";

function Home() {
  const [now, setNow] = useState(() => Date.now());

  const layout = useGlobalStore.use.layout();
  const switchLayout = useGlobalStore.use.switchLayout();

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
      </ul>

      <div>
        <Camera className={styles.camera} color="#ffadff" />
      </div>

      <div>{layout}</div>

      <div>
        <button type="button" onClick={handleSwitchLayout}>click it</button>
        <button type="button" onClick={logoutApi}>logout</button>
        <button type="button" onClick={() => execDownload(loginApi, "test", [{ username: "admin", password: "dot001" }])}>download</button>
      </div>
    </div>
  );
}

export default Home;
