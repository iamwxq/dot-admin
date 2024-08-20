import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "@/App.tsx";
import { SecsEnum } from "#/enums/time";

async function enableMocking() {
  if (import.meta.env.VITE_APP_MOCK !== "true")
    return Promise.resolve();

  try {
    const { worker } = await import("@/mocks/browser");
    return worker.start();
  }
  catch {
    return Promise.resolve();
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: SecsEnum.S10,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

enableMocking().then(
  () => ReactDOM.createRoot(document.getElementById("root")!)
    .render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools
            buttonPosition="bottom-left"
            initialIsOpen={false}
          />

          <Suspense>
            <App />
          </Suspense>
        </QueryClientProvider>
      </React.StrictMode>,
    ),
);
