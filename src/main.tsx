import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <main className="h-screen text-foreground">
          <App />
        </main>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
