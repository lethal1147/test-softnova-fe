import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LoaderLayout } from "./layout";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoaderLayout />
    <App />
    <Toaster richColors />
  </StrictMode>
);
