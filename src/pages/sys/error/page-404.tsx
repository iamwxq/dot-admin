import { useThemeToken } from "@/hooks/theme/use-theme-token";

function Page404() {
  const {
    colorBgBase,
    colorTextBase,
  } = useThemeToken();

  return (
    <>
      404
    </>
  );
};

export default Page404;
