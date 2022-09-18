import { combineReducers } from "redux";
import comments, { commentsSaga } from "./comments";
import target from "./target";
import page from "./page";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({ comments, target, page });
export function* rootSaga() {
  yield all([commentsSaga()]);
}

export default rootReducer;
