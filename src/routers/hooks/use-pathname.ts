import { useMemo } from "react";
import { useLocation as _useLocation } from "react-router-dom";

export function useLocation() {
  const { pathname } = _useLocation();

  return useMemo(() => pathname, [pathname]);
}
