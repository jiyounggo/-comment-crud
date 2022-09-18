import { combineReducers } from 'redux';
import comments, { commentsSaga } from './comments';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ comments });
export function* rootSaga() {
  yield all([commentsSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;
