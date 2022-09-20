import { getCommentsApi, saveCommentApi } from '../api/commentsApi';
import {
  handleAsyncActions,
  reducerUtils,
  createPromiseSaga,
} from '../util/async.utill';
import { takeEvery } from 'redux-saga/effects';

// 액션 타입
const GET_COMMENTS = 'GET_COMMENTS';
const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR';

const SAVE_COMMENT = 'SAVE_COMMENT';
const SAVE_COMMENT_SUCCESS = 'SAVE_COMMENT_SUCCESS';
const SAVE_COMMENT_ERROR = 'SAVE_COMMENT_ERROR';

// const UPDATE_COMMENT = 'UPDATE_COMMENT';
// const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
// const UPDATE_COMMENT_ERROR = 'UPDATE_COMMENT_ERROR';

// const DELETE_COMMENT = 'DELETE_COMMENT';
// const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
// const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

// thunk 함수
// export const getComments = createPromiseThunk(GET_COMMENTS, getCommentsApi);

//saga 액션 생성 함수
export const getComments = () => ({ type: GET_COMMENTS });
export const saveComment = (comment) => ({
  type: SAVE_COMMENT,
  payload: comment,
});

const getCommentsSaga = createPromiseSaga(GET_COMMENTS, getCommentsApi);
const saveCommentSaga = createPromiseSaga(SAVE_COMMENT, saveCommentApi);

// 사가들을 합치기
export function* commentsSaga() {
  //takeEvery : 액션을 모니터링
  yield takeEvery(GET_COMMENTS, getCommentsSaga);
  yield takeEvery(SAVE_COMMENT, saveCommentSaga);
}

const initialState = {
  comments: reducerUtils.initial(),
  comment: reducerUtils.initial(),
};

// 리듀서 *
export default function comments(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
    case GET_COMMENTS_SUCCESS:
    case GET_COMMENTS_ERROR:
      return handleAsyncActions(GET_COMMENTS, 'comments', true)(state, action);

    case SAVE_COMMENT:
    case SAVE_COMMENT_SUCCESS:
    case SAVE_COMMENT_ERROR:
      return handleAsyncActions(SAVE_COMMENT, 'comment', true)(state, action);

    default:
      return state;
  }
}
