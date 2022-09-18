import { applyMiddleware, createStore } from "redux";
import commentsApp from "./modules/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
  commentsApp,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
