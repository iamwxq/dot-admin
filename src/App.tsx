import AntdConfigProvider from "@/components/antd";
import Router from "@/routers";
import { App as AntdApp } from "antd";

function App() {
  return (
    <AntdConfigProvider>
      <AntdApp>
        <Router />
      </AntdApp>
    </AntdConfigProvider>
  );
}

export default App;
