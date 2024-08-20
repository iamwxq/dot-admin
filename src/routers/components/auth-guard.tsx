import React, { useCallback, useEffect } from "react";
import { useRouter } from "../hooks/use-router";
import { useUserToken } from "@/stores/user";

interface Props {
  children?: React.ReactNode;
}

function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { accessToken } = useUserToken();

  const validate = useCallback(() => {
    if (!accessToken)
      router.replace("/login");
  }, [router, accessToken]);

  useEffect(() => {
    validate();
  }, [validate]);

  return (
    <>
      {children}
    </>
  );
};

export default AuthGuard;
