import { useMemo } from "react";
import { useParams as _useParams } from "react-router-dom";

export function useParams<K extends string = string>() {
  const params = _useParams<K>();

  return useMemo(() => params, [params]);
}
