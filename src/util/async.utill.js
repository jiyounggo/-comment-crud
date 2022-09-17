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
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload });
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
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload, meta: id });
    } catch (e) {
      yield put({ type: ERROR, error: true, payload: e, meta: id });
    }
  };
};

export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = getStatus(type);

  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(state[key].data),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};

export const handleAsyncActionsById = (type, key) => {
  const [SUCCESS, ERROR] = getStatus(type);

  return (state, action) => {
    const id = action.meta;

    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(state[key][id] && state[key][id].data),
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload),
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload),
          },
        };
      default:
        return state;
    }
  };
};
