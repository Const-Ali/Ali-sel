import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Shop_Card_Pro } from "./Pages/context/Shop_Card_Cont";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Shop_Card_Pro>
        <App />
      </Shop_Card_Pro>
    </BrowserRouter>
  </StrictMode>
);
