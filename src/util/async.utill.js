import { call, put } from "redux-saga/effects";

export const reducerUtils = {
  initial: (data = null) => ({
    loading: false,
    data,
    error: null,
  }),
  loading: (preveState = null) => ({
    data: preveState,
    loading: true,
    error: null,
  }),
  success: (data) => ({
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};

const getStatus = (type) => [`${type}_SUCCESS`, `${type}_ERROR`];

export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = getStatus(type);

  return function* saga(action) {
    try {
      const response = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload: response.data });
    } catch (e) {
      yield put({ type: ERROR, error: true, payload: e });
    }
  };
};

export const createPromiseSagaByID = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = getStatus(type);

  return function* saga(action) {
    const id = action.meta;

    try {
      const response = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload: response.data, meta: id });
    } catch (e) {
      yield put({ type: ERROR, error: true, payload: e, meta: id });
    }
  };
};

export const handleAsyncActions = (type) => {
  const [SUCCESS, ERROR] = getStatus(type);

  return (state, action) => {
    switch (action.type) {
      case type:
        return reducerUtils.loading(state.data);
      case SUCCESS:
        return reducerUtils.success(action.payload);
      case ERROR:
        return reducerUtils.error(action.payload);
      default:
        return state;
    }
  };
};

export const handleAsyncActionsById = (type) => {
  const [SUCCESS, ERROR] = getStatus(type);

  return (state, action) => {
    const id = action.meta;

    switch (action.type) {
      case type:
        return {
          ...state,
          [id]: reducerUtils.loading(state[id] && state[id].data),
        };
      case SUCCESS:
        return {
          ...state,
          [id]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [id]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};
