import { StyleProvider } from "@ant-design/cssinjs";
import "antd/dist/reset.css";

interface Props {
  children: React.ReactNode;
}

function AntdConfigProvider({ children }: Props) {
  return (
    <StyleProvider hashPriority="high">
      {children}
    </StyleProvider>
  );
};

export default AntdConfigProvider;
