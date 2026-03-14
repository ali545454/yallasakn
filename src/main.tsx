import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

const GOOGLE_CLIENT_ID =
  "366901537253-k3kmsl6u63uursgkhi47jngldu11nr0q.apps.googleusercontent.com";

const initApp = async () => {
  createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  );
};

initApp();
