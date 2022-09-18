export const ADD_COMMENT =
  "pre-onboarding-assignment-week-3-2-team-1/comments/ADD_COMMENT";
export const MODIFY_COMMENT =
  "pre-onboarding-assignment-week-3-2-team-1/comments/MODIFY_COMMENT";
export const DELETE_COMMENT =
  "pre-onboarding-assignment-week-3-2-team-1/comments/DELETE_COMMENT";

export const GET_COMMENT_START =
  "pre-onboarding-assignment-week-3-2-team-1/comments/GET_COMMENT_START";
export const GET_COMMENT_SUCCESS =
  "pre-onboarding-assignment-week-3-2-team-1/comments/GET_COMMENT_SUCCESS";
export const GET_COMMENT_FAIL =
  "pre-onboarding-assignment-week-3-2-team-1/comments/GET_COMMENT_FAIL";

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  };
};

export const modifyComment = (id) => {
  return {
    type: MODIFY_COMMENT,
    id,
  };
};

export const deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    id,
  };
};

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

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const reducer = (prevState = initialState, action) => {
  if (action.type === GET_COMMENT_START) {
    return {
      ...prevState,
      loading: true,
      error: null,
    };
  }

  if (action.type === GET_COMMENT_SUCCESS) {
    return {
      ...prevState,
      loading: false,
      data: action.data,
    };
  }

  if (action.type === GET_COMMENT_FAIL) {
    return {
      ...prevState,
      loading: false,
      error: action.error,
    };
  }
  return prevState;
};

export const getCommentsThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(getCommentStart());
      const res = await (await fetch("http://localhost:4000/comments")).json();
      dispatch(getCommentSuccess(res));
    } catch (error) {
      dispatch(getCommentFail(error));
    }
  };
};

export default reducer;
