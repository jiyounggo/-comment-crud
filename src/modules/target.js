/* 액션 타입 */
const INIT_TARGET = "INIT_TARGET";
const SET_TARGET = "SET_TARGET";

/* 액션 생성 함수 */
export const initTarget = () => ({ type: INIT_TARGET });
export const setTarget = (target) => ({ type: SET_TARGET, data: target });

/* 초기 상태 선언 */
const initialState = {
  id: "",
  profile_url: "",
  author: "",
  content: "",
  createdAt: "",
};

/* 리듀서 선언 */
export default function target(state = initialState, action) {
  switch (action.type) {
    case INIT_TARGET:
      return initialState;
    case SET_TARGET:
      return action.data;
    default:
      return state;
  }
}
