import { combineReducers } from "redux";
import comments, { commentsSaga } from "./comments";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({ comments });
export function* rootSaga() {
  yield all([commentsSaga()]);
}

export default rootReducer;
