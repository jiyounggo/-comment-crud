import { put, call, takeEvery } from "redux-saga/effects";

export const GET_COMMENT_START =
  "pre-onboarding-assignment-week-3-2-team-1/comments/GET_COMMENT_START";
export const GET_COMMENT_SUCCESS =
  "pre-onboarding-assignment-week-3-2-team-1/comments/GET_COMMENT_SUCCESS";
export const GET_COMMENT_FAIL =
  "pre-onboarding-assignment-week-3-2-team-1/comments/GET_COMMENT_FAIL";

export const POST_COMMENT_START =
  "pre-onboarding-assignment-week-3-2-team-1/comments/POST_COMMENT_START";
export const POST_COMMENT_SUCCESS =
  "pre-onboarding-assignment-week-3-2-team-1/comments/POST_COMMENT_SUCCESS";
export const POST_COMMENT_FAIL =
  "pre-onboarding-assignment-week-3-2-team-1/comments/POST_COMMENT_FAIL";

export const DELETE_COMMENT_START =
  "pre-onboarding-assignment-week-3-2-team-1/comments/DELETE_COMMENT_START";
export const DELETE_COMMENT_SUCCESS =
  "pre-onboarding-assignment-week-3-2-team-1/comments/DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAIL =
  "pre-onboarding-assignment-week-3-2-team-1/comments/DELETE_COMMENT_FAIL";

export const getCommentStart = () => {
  return {
    type: GET_COMMENT_START,
  };
};

export const getCommentSuccess = (data) => {
  return {
    type: GET_COMMENT_SUCCESS,
    data,
  };
};

export const getCommentFail = (error) => {
  return {
    type: GET_COMMENT_FAIL,
    error,
  };
};

export const postCommentStart = () => {
  return {
    type: POST_COMMENT_START,
  };
};

export const postCommentSuccess = () => {
  return {
    type: POST_COMMENT_SUCCESS,
  };
};

export const postCommentFail = (error) => {
  return {
    type: POST_COMMENT_FAIL,
    error,
  };
};

export const deleteCommentStart = () => {
  return {
    type: DELETE_COMMENT_START,
  };
};

export const deleteCommentSuccess = () => {
  return {
    type: DELETE_COMMENT_SUCCESS,
  };
};

export const deleteCommentFail = (error) => {
  return {
    type: DELETE_COMMENT_FAIL,
    error,
  };
};

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_START:
      return {
        ...prevState,
        loading: true,
        error: null,
      };

    case GET_COMMENT_SUCCESS:
      return {
        ...prevState,
        loading: false,
        data: action.data,
      };

    case GET_COMMENT_FAIL:
      return {
        ...prevState,
        loading: false,
        error: action.error,
      };

    case POST_COMMENT_START:
      return {
        ...prevState,
        loading: false,
        error: null,
      };

    case POST_COMMENT_SUCCESS:
      return {
        ...prevState,
      };

    case POST_COMMENT_FAIL:
      return {
        ...prevState,
        error: action.error,
      };

    case DELETE_COMMENT_START:
      return {
        ...prevState,
        loading: false,
        error: null,
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...prevState,
      };

    case DELETE_COMMENT_FAIL:
      return {
        ...prevState,
        error: action.error,
      };

    default:
      return prevState;
  }
};

export default reducer;

export const getCommentsThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(getCommentStart());
      const res = await (await fetch("http://localhost:4000/comments")).json();
      dispatch(getCommentSuccess(res));
      console.log(res);
    } catch (error) {
      dispatch(getCommentFail(error));
    }
  };
};

export const getCommentThunk = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getCommentStart());
      const res = await (
        await fetch(`http://localhost:4000/comments/${id}`)
      ).json();
      dispatch(getCommentSuccess(res));
    } catch (error) {
      dispatch(getCommentFail(error));
    }
  };
};

export const postCommentsThunk = (data) => {
  return async (dispatch) => {
    try {
      dispatch(postCommentStart());
      await fetch("http://localhost:4000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      dispatch(postCommentSuccess());
      dispatch(getCommentsThunk());
    } catch (error) {
      dispatch(postCommentFail(error));
    }
  };
};

export const deleteCommentsThunk = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteCommentStart());
      await fetch(`http://localhost:4000/comments/${id}`, {
        method: "DELETE",
      });
      dispatch(deleteCommentSuccess());
      dispatch(getCommentsThunk());
    } catch (error) {
      dispatch(deleteCommentFail(error));
    }
  };
};

const GET_COMMENTS_SAGA_START = "GET_COMMENTS_SAGA_START";

function* getCommentsSaga(action) {
  try {
    yield put(getCommentStart());
    const res = yield call(() =>
      fetch("http://localhost:4000/comments")
        .then((res) => res.json())
        .then((res) => res)
    );
    yield put(getCommentSuccess(res));
  } catch (error) {
    yield put(getCommentFail(error));
  }
}

export function getCommentsSagaStart() {
  return {
    type: GET_COMMENTS_SAGA_START,
  };
}

export function* commentsSaga() {
  yield takeEvery(GET_COMMENTS_SAGA_START, getCommentsSaga);
}
