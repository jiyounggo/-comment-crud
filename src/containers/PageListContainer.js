import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageList from "../components/PageList";
import { changePage, PAGINATION_LIMIT } from "../redux/modules/pagination";

function PageListContainer() {
  const { data } = useSelector((state) => state.comments);
  const { page } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();

  const handleSetPage = useCallback(
    (page) => {
      dispatch(changePage(page));
    },
    [dispatch]
  );

  return (
    <PageList
      totalPage={Math.ceil(data.length / PAGINATION_LIMIT)}
      page={page}
      handleSetPage={handleSetPage}
    />
  );
}

export default PageListContainer;
