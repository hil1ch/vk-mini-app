import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import bridge from "@vkontakte/vk-bridge";
import { ConfigProvider, AdaptivityProvider } from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';

bridge.send("VKWebAppInit");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <App />
      </AdaptivityProvider>
    </ConfigProvider>
  </StrictMode>
);
