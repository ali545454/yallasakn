import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Loading from "@/components/Loading";

createRoot(document.getElementById("root")!).render(<App />);
