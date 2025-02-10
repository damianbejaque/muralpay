import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProviderWrapper } from "./context/ThemeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <ThemeProviderWrapper>
          <App />
        </ThemeProviderWrapper>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
