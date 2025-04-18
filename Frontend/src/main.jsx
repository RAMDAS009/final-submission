import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { SubmissionProvider } from "./context/SubmissionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SubmissionProvider>
      <App />
    </SubmissionProvider>
  </StrictMode>
);
