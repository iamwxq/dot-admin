import { useEffect, useState } from "react";
import { Camera } from "lucide-react";

import styles from "@/styles/pages/Home.module.scss";

import { dateFormat } from "@/utils";
import { SecsEnum } from "@/enums/time";
import { useGlobalStore } from "@/stores/global";
import { DateFormatEnum } from "@/enums/format";

function Home() {
  const [now, setNow] = useState(() => Date.now());

  const layout = useGlobalStore.use.layout();
  const switchLayout = useGlobalStore.use.switchLayout();

  function handleSwitchLayout() {
    fetch("https://examples.com/user")
      .then(res => res.json())
      .then(data => console.info(data));

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
      </div>
    </div>
  );
}

export default Home;
