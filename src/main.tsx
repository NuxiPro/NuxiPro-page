import { StartClient } from "@tanstack/react-start/client";
import { hydrateRoot } from "react-dom/client";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");
hydrateRoot(root, <StartClient />);
