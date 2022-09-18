import { all } from "@redux-saga/core/effects";
import { commentsSaga } from "./comments";

export default function* rootSaga() {
  yield all([commentsSaga()]);
}
