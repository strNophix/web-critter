import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";
import { TransmissionProvider } from "@/providers/transmission";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TransmissionProvider>
      <App />
    </TransmissionProvider>
  </React.StrictMode>
);
