import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "shake"}>
        <div className="bg-gradient-to-r from-indigo-500 via-purple-300 to-pink-400">
          <App />
        </div>
      </StyleSheetManager>
    </BrowserRouter>
  </Suspense>
);
