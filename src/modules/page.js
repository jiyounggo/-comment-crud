/* 액션 타입 */
const SET_PAGE = "SET_PAGE";

/* 액션 생성 함수 */
export const setPage = (page) => ({ type: SET_PAGE, data: page });

/* 초기 상태 선언 */
const initialState = 1;

/* 리듀서 선언 */
export default function target(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE:
      return action.data;
    default:
      return state;
  }
}
