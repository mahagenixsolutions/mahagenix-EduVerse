import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/globals.css";
import { QueryProvider } from "./providers/QueryProvider";

async function ennableMocking() {
  const { worker } = await import("../src/mock/browser");

  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
}
ennableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <QueryProvider>
      <App />
    </QueryProvider>,
  );
});
