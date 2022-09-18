import { takeEvery } from "redux-saga/effects";
import {
  createPromiseSaga,
  handleAsyncActions,
  reducerUtils,
} from "../util/async.utill";
import * as api from "../api/api";

/* 액션 타입 */
const GET_COMMENTS = "GET_COMMENTS";
const SAVE_COMMENT = "SAVE_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

/* 액션 생성 함수 */
export const getComments = (params) => ({
  type: GET_COMMENTS,
  payload: params,
});
export const saveComment = (comment) => ({
  type: SAVE_COMMENT,
  payload: comment,
});
export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  payload: comment,
});
export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: id,
});

const getCommentsSaga = createPromiseSaga(GET_COMMENTS, api.getComments);
const saveCommentSaga = createPromiseSaga(SAVE_COMMENT, api.saveComment);
const updateCommentSaga = createPromiseSaga(UPDATE_COMMENT, api.updateComment);
const deleteCommentSaga = createPromiseSaga(DELETE_COMMENT, api.deleteComment);

export function* commentsSaga() {
  yield takeEvery(GET_COMMENTS, getCommentsSaga);
  yield takeEvery(SAVE_COMMENT, saveCommentSaga);
  yield takeEvery(UPDATE_COMMENT, updateCommentSaga);
  yield takeEvery(DELETE_COMMENT, deleteCommentSaga);
}

// export const goToDefaultPage = () => {}; // TODO 저장, 삭제 후 1 페이지로 이동하는 함수?

/* 초기 상태 */
const initialState = {
  comments: reducerUtils.initial(),
  comment: reducerUtils.initial(),
};

/* 리듀서 */
export default function comments(state = initialState, action) {
  if (action.type.startsWith(GET_COMMENTS))
    return handleAsyncActions(GET_COMMENTS, "comments")(state, action);
  if (action.type.startsWith(SAVE_COMMENT))
    return handleAsyncActions(SAVE_COMMENT, "comment")(state, action);
  if (action.type.startsWith(UPDATE_COMMENT))
    return handleAsyncActions(UPDATE_COMMENT, "comment")(state, action);
  if (action.type.startsWith(DELETE_COMMENT))
    return handleAsyncActions(DELETE_COMMENT, "comment")(state, action);

  return state;
}
