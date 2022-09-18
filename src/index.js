import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import rootReducer, { rootSaga } from "./modules/rootReducer";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";

const container = document.getElementById("root");
const root = createRoot(container);

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
