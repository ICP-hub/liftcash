import "./index.css";
import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utils/useAuthClient";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
    </Provider>
  </React.StrictMode>
);
