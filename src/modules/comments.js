import { takeEvery } from "redux-saga/effects";
import {
  createPromiseSaga,
  createPromiseSagaByID,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from "../util/async.utill";
import * as api from "../api/api";

/* 액션 타입 */
const actionTypeArray = [
  "GET_COMMENTS",
  "SAVE_COMMENT",
  "UPDATE_COMMENT",
  "DELETE_COMMENT",
];
const [GET_COMMENTS, SAVE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT] =
  actionTypeArray;

/* 액션 생성 함수 */
export const getComments = () => ({ type: GET_COMMENTS });
export const saveComment = (id) => ({
  type: SAVE_COMMENT,
  payload: id,
  meta: id,
});
export const updateComment = (id) => ({
  type: UPDATE_COMMENT,
  payload: id,
  meta: id,
});
export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: id,
  meta: id,
});

const getCommentsSaga = createPromiseSaga(GET_COMMENTS, api.getComments);
const saveCommentSaga = createPromiseSagaByID(SAVE_COMMENT, api.saveComment);
const updateCommentSaga = createPromiseSagaByID(
  UPDATE_COMMENT,
  api.updateComment
);
const deleteCommentSaga = createPromiseSagaByID(
  DELETE_COMMENT,
  api.deleteComment
);

export function* commentsSaga() {
  yield takeEvery(GET_COMMENTS, getCommentsSaga);
  yield takeEvery(SAVE_COMMENT, saveCommentSaga);
  yield takeEvery(UPDATE_COMMENT, updateCommentSaga);
  yield takeEvery(DELETE_COMMENT, deleteCommentSaga);
}

// export const goToDefaultPage = () => {}; // TODO 저장, 삭제 후 1 페이지로 이동하는 함수?

/* 초기 상태 */
const initialState = reducerUtils.initial();

/* 리듀서 */
// const reducerMap = {
//   GET_COMMENTS: handleAsyncActions(GET_COMMENTS),
//   SAVE_COMMENT: handleAsyncActionsById(SAVE_COMMENT),
//   UPDATE_COMMENT: handleAsyncActionsById(UPDATE_COMMENT),
//   DELETE_COMMENT: handleAsyncActionsById(DELETE_COMMENT),
// };

export default function comments(state = initialState, action) {
  if (action.type.startsWith(GET_COMMENTS))
    return handleAsyncActions(GET_COMMENTS)(state, action);
  if (action.type.startsWith(SAVE_COMMENT))
    return handleAsyncActionsById(SAVE_COMMENT)(state, action);
  if (action.type.startsWith(UPDATE_COMMENT))
    return handleAsyncActionsById(UPDATE_COMMENT)(state, action);
  if (action.type.startsWith(DELETE_COMMENT))
    return handleAsyncActionsById(DELETE_COMMENT)(state, action);

  return state;
  // return actionTypeArray.reduce((type) => {
  //   return action.type.startsWith(type)
  //     ? reducerMap[type](state, action)
  //     : state;
  // });
}
