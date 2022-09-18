import React from "react";
import PageList from "../components/PageList";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../modules/page";

function PageListContainer() {
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const onSetPage = (page) => dispatch(setPage(page));

  return <PageList page={page} setPage={onSetPage} />;
}

export default PageListContainer;
