import { call, put } from 'redux-saga/effects';

// 프로미스를 기다렸다가 결과를 디스패치하는 사가
export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    try {
      // 재사용성을 위하여 promiseCreator 의 파라미터엔 action.payload 값을 넣도록 설정합니다.
      // 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 된다.
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload });
    } catch (e) {
      yield put({ type: ERROR, error: true, payload: e });
    }
  };
};

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

// 비동기 관련 액션들을 처리하는 리듀서를 만들어줍니다.
// type 은 액션의 타입, key 는 상태의 key (예: posts, post) 입니다.
export const handleAsyncActions = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
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
