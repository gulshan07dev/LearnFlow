import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import Modal from "react-modal";
import { Provider } from "react-redux";
import store from "./redux/store";
import ScrollToTop from "./utils/ScrollToTop";
Modal.setAppElement("#root");
 
// Use createRoot from react-dom/client
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
     <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
   </Provider>
);
