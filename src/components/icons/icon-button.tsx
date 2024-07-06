import type { ButtonProps } from "antd";
import { Button } from "antd";

interface IconButtonProps extends ButtonProps {
  icon: ButtonProps["icon"];
}

function IconButton(props: IconButtonProps) {
  const { children } = props;

  return (
    <Button {...props}>
      {children}
    </Button>
  );
};

export default IconButton;
