import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HerbProvider } from "./contexts/HerbContext.jsx";
import { ConstitutionProvider } from "./contexts/ConstitutionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HerbProvider>
      <ConstitutionProvider>
        <App />
      </ConstitutionProvider>
    </HerbProvider>
  </StrictMode>,
);
