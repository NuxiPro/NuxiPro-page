import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { getRouter } from "./router";
import "./styles.css";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<RouterProvider router={getRouter()} />);
}
