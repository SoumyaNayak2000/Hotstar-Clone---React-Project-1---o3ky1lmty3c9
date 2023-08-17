import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

import { store } from "./reduxStore/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom/dist";
// import Loader from "./components/Loader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    
      <Provider store={store}>
        <App />
        {/* <Loader/> */}
      </Provider>
  </BrowserRouter>
);
