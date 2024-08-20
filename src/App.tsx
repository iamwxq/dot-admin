import { App as AntdApp } from "antd";
import AntdConfigProvider from "@/components/antd";
import Router from "@/routers";

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
