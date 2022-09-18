import { combineReducers } from "redux";
import comments from "./comments";
import pagination from "./pagination";

const reducer = combineReducers({
  comments,
  pagination,
});

export default reducer;
