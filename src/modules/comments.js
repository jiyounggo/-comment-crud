import { getCommentsApi } from '../api/commentsApi';
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
} from '../util/async.utill';

// 액션 타입
const GET_COMMENTS = 'GET_COMMENTS';
const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR';

const SAVE_COMMENT = 'SAVE_COMMENT';
const SAVE_COMMENT_SUCCESS = 'SAVE_COMMENT_SUCCESS';
const SAVE_COMMENT_ERROR = 'SAVE_COMMENT_ERROR';

const UPDATE_COMMENT = 'UPDATE_COMMENT';
const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
const UPDATE_COMMENT_ERROR = 'UPDATE_COMMENT_ERROR';

const DELETE_COMMENT = 'DELETE_COMMENT';
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

// thunk 함수
export const getComments = createPromiseThunk(GET_COMMENTS, getCommentsApi);

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
      const postsReducer = handleAsyncActions(GET_COMMENTS, 'comments');
      return postsReducer(state, action);

    default:
      return state;
  }
}
