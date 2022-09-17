import { call, put, takeEvery } from "redux-saga/effects";
import {
  createPromiseSaga,
  createPromiseSagaByID,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from "../util/async.utill";

const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

/* 액션 타입 */
const GET_COMMENTS = "GET_COMMENTS";
const SAVE_COMMENT = "SAVE_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

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

const getCommentsSaga = createPromiseSaga("GET_COMMENTS", () => {}); // TODO api 연동 & 통신 결과값 확인 후 수정 예정
const saveCommentSaga = createPromiseSagaByID("SAVE_COMMENT", () => {}); // TODO api 연동 & 통신 결과값 확인 후 수정 예정
const updateCommentSaga = createPromiseSagaByID("UPDATE_COMMNET", () => {}); // TODO api 연동 & 통신 결과값 확인 후 수정 예정
const deleteCommentSaga = createPromiseSagaByID("DELETE_COMMENT", () => {}); // TODO api 연동 & 통신 결과값 확인 후 수정 예정

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
};

/* 리듀서 */
export default function comments(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
    case `${GET_COMMENTS}_${SUCCESS}`:
    case `${GET_COMMENTS}_${ERROR}`:
      return handleAsyncActions(GET_COMMENTS, "comments")(state, action);
    case SAVE_COMMENT:
    case `${SAVE_COMMENT}_${SUCCESS}`:
    case `${SAVE_COMMENT}_${ERROR}`:
      return handleAsyncActionsById(SAVE_COMMENT, "comments")(state, action);
    case UPDATE_COMMENT:
    case `${UPDATE_COMMENT}_${SUCCESS}`:
    case `${UPDATE_COMMENT}_${ERROR}`:
      return handleAsyncActionsById(UPDATE_COMMENT, "comments")(state, action);
    case DELETE_COMMENT:
    case `${DELETE_COMMENT}_${SUCCESS}`:
    case `${DELETE_COMMENT}_${ERROR}`:
      return handleAsyncActionsById(DELETE_COMMENT, "comments")(state, action);
    default:
      return state;
  }
}