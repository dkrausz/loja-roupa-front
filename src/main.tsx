import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {ClientContextProvider} from "./providers/clientContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ClientContextProvider>
        <App />
      </ClientContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
