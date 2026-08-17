import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { I18nProvider } from "./i18n/index.tsx";
import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}
