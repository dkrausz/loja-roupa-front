import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {ClientContextProvider} from "./providers/clientContext.tsx";
import {ControllerContextProvider} from "./providers/controllerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ControllerContextProvider>
        <ClientContextProvider>
          <App />
        </ClientContextProvider>
      </ControllerContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
