const CHANGE_PAGE =
  "pre-onboarding-assignment-week-3-2-team-1/pagination/CHANGE_PAGE";

export const changePage = (page) => {
  return {
    type: CHANGE_PAGE,
    page,
  };
};

export const PAGINATION_LIMIT = 4;

const initialState = {
  page: 1,
};

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...prevState,
        page: action.page,
      };
    default:
      return prevState;
  }
};

export default reducer;
