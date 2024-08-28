import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { ProTableState, RecordType } from "#/components/pro-table";
import type { PRes } from "#/api";

interface Options {
  auto?: boolean;
  initial?: RecordType ;
  pageable?: boolean ;
}

/**
 * @param key useQuery key
 * @param api request api
 * @param options request options
 * @param fallback fallback after coming across errors
 */
export function useTable<T extends RecordType>(
  key: string | undefined,
  api?: (params: any) => Promise<PRes<T>>,
  options: Options = { auto: true, initial: undefined, pageable: true },
  fallback?: (error: any) => void,
) {
  // props
  const {
    auto = true,
    initial = undefined,
    pageable = true,
  } = options;

  // states
  const [state, setState] = useState<ProTableState>({
    auto: false,
    // query params
    params: { ...initial },
    // enable page
    pagenation: {
      total: 0,
      size: 10,
      current: 1,
    },
  });

  // derived states
  const param = { current: state.pagenation.current, size: state.pagenation.size };

  // queries
  // data -> table page data
  const queryClient = useQueryClient();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["pro-table", key, JSON.stringify(state.params)],
    queryFn: ({ queryKey }) => api?.(JSON.parse(queryKey[2] as string)),
    enabled: false,
  });

  // methods
  function search() {
    // TODO search data with specify params
  }

  function reset() {
    // TODO reset table and search params
  }

  // side effects
  useEffect(() => {
    if (!api)
      return;

    if (auto && !state.auto) {
      setState(prev => ({ ...prev, auto, params: {
        ...initial,
        ...(pageable ? param : {}),
      } }));
      queryClient.removeQueries({ queryKey: ["pro-table"], type: "inactive" });
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (state.auto) {
        await refetch();
        queryClient.removeQueries({ queryKey: ["pro-table"], type: "inactive" });
      }
    })();
  }, [state.auto]);

  return {
    data,
    loading: isFetching,

    search,
    reset,
  };
}
