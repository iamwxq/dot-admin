import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";

async function enableMocking() {
  if (import.meta.env.VITE_APP_MOCK !== "true")
    return Promise.resolve();

  const { worker } = await import("@/mocks/browser");
  return worker.start();
}

enableMocking().then(
  () => ReactDOM.createRoot(document.getElementById("root")!)
    .render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    ),
);
