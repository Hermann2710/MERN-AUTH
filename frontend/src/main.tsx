import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeProvider from "./contexts/ThemeContext.tsx";
import "react-toastify/dist/ReactToastify.min.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
