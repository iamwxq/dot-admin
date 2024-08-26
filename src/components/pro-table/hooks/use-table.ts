import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { ProTableState, RecordType } from "#/components/pro-table";
import type { PRes } from "#/api";

interface Options {
  auto: boolean;
  initial: RecordType;
  pageable: boolean ;
}

export function useTable<T extends RecordType>(
  key: string,
  api?: (params: any) => Promise<PRes<T>>,
  options: Options = { auto: true, initial: {}, pageable: true },
  callback?: (data: PRes<T>) => any,
  fallback?: (error: any) => void,
) {
  // props
  const params = {};
  const { auto, initial, pageable } = options;

  // states
  const [state, setState] = useState<ProTableState>({
    params: {},
    loading: false,
    pagenation: {
      total: 0,
      size: 10,
      current: 1,
    },
  });

  // derived states
  const param = { page: state.pagenation.current, size: state.pagenation.size };

  // queries
  const { data, refetch } = useQuery({
    queryKey: [key, params],
    queryFn: () => api?.({}),
    enabled: false,
  });

  // methods
  async function fetchData() {
    if (!api)
      return;

    try {
      setState(prev => ({ ...prev, loading: true }));

      Object.assign(params, initial, pageable ? param : {});
      await refetch();
    }
    catch (error) {
      fallback?.(error);
    }
    finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }

  // side effects
  useEffect(() => {
    if (auto)
      fetchData();
  }, [auto, initial, pageable]);

  return {
    data,
    fetchData,
  };
}
