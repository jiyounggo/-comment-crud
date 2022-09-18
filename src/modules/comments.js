import * as commentsAPI from '../api/comments';
import { reducerUtils, handleAsyncActions, handleAsyncActionsById, createPromiseSaga, createPromiseSagaById } from '../util/async.utill';
import { takeEvery, call, put } from 'redux-saga/effects';

// action type
const GET_COMMENTS = 'GET_COMMENTS';
const CREATE_COMMENT = 'CREATE_COMMENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

//comments 여러개 조회하기
const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'; // 요청 성공
const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR'; // 요청 실패

// comment 생성
const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR';

// comment 수정
const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
const UPDATE_COMMENT_ERROR = 'UPDATE_COMMENT_ERROR';

// comment 삭제
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

// 액션 생성 함수
export const getComments = () => ({ type: GET_COMMENTS });
export const createComment = () => ({ type: CREATE_COMMENT });
export const updateComment = (id) => ({ type: UPDATE_COMMENT, payload: id, meta: id });
export const deleteComment = (id) => ({ type: DELETE_COMMENT, payload: id, meta: id });

function* getCommentsSaga() {
  try {
    const comments = yield call(commentsAPI.getComments);
    yield put({
      type: GET_COMMENTS_SUCCESS,
      payload: comments,
    }); // 성공 액션 디스패치
  } catch (e) {
    yield put({
      type: GET_COMMENTS_ERROR,
      error: true,
      payload: e,
    }); // 실패 액션 디스패치
  }
}
function* createCommentSaga() {
  try {
    const comment = yield call(commentsAPI.creactComment);
    yield put({
      type: CREATE_COMMENT_SUCCESS,
      payload: comment,
    }); // 성공 액션 디스패치
  } catch (e) {
    yield put({
      type: CREATE_COMMENT_ERROR,
      error: true,
      payload: e,
    }); // 실패 액션 디스패치
  }
}

// 액션이 지니고 있는 값을 조회하고 싶다면 action을 파라미터로 받아와서 사용 할 수 있습니다.
function* updateCommentSaga(action) {
  const param = action.payload;
  const id = action.meta;
  try {
    const comment = yield call(commentsAPI.updateCommentById, param); // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.
    yield put({
      type: UPDATE_COMMENT_SUCCESS,
      payload: comment,
      meta: id,
    });
  } catch (e) {
    yield put({
      type: UPDATE_COMMENT_ERROR,
      error: true,
      payload: e,
      meta: id,
    });
  }
}
function* deleteCommentSaga(action) {
  const param = action.payload;
  const id = action.meta;
  try {
    const comment = yield call(commentsAPI.deleteCommentById, param); // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.
    yield put({
      type: DELETE_COMMENT_SUCCESS,
      payload: comment,
      meta: id,
    });
  } catch (e) {
    yield put({
      type: DELETE_COMMENT_ERROR,
      error: true,
      payload: e,
      meta: id,
    });
  }
}

export function* commentsSaga() {
  yield takeEvery(GET_COMMENTS, getCommentsSaga);
  yield takeEvery(CREATE_COMMENT, createCommentSaga);
  yield takeEvery(UPDATE_COMMENT, updateCommentSaga);
  yield takeEvery(DELETE_COMMENT, deleteCommentSaga);
}

// 초기값
const initialState = reducerUtils.initial;

// 리듀서
export default function comments(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
    case GET_COMMENTS_SUCCESS:
    case GET_COMMENTS_ERROR:
      return handleAsyncActions(GET_COMMENTS, 'comments', true)(state, action);
    case CREATE_COMMENT:
    case CREATE_COMMENT_SUCCESS:
    case CREATE_COMMENT_ERROR:
      return handleAsyncActions(CREATE_COMMENT, 'comment', true)(state, action);
    case UPDATE_COMMENT:
    case UPDATE_COMMENT_SUCCESS:
    case UPDATE_COMMENT_ERROR:
      return handleAsyncActionsById(UPDATE_COMMENT, 'comment', true)(state, action);
    case DELETE_COMMENT:
    case DELETE_COMMENT_SUCCESS:
    case DELETE_COMMENT_ERROR:
      return handleAsyncActionsById(DELETE_COMMENT, 'comment', true)(state, action);
    default:
      return state;
  }
}
