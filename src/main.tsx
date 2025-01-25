import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LoaderLayout } from "./layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoaderLayout />
    <App />
  </StrictMode>
);
