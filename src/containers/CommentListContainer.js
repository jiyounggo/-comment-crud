import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentList from "../components/CommentList";
import {
  deleteCommentsThunk,
  getCommentsThunk,
  getCommentsSagaStart,
} from "../redux/modules/comments";
import { PAGINATION_LIMIT } from "../redux/modules/pagination";

function CommentListContainer() {
  const { data, loading, error } = useSelector((state) => state.comments);
  const { page } = useSelector((state) => state.pagination);
  const offset = (page - 1) * PAGINATION_LIMIT;
  console.log(page, offset);
  const dispatch = useDispatch();

  const getComments = useCallback(() => {
    dispatch(getCommentsSagaStart());
  }, [dispatch]);

  const deleteComments = useCallback(
    (id) => {
      dispatch(deleteCommentsThunk(id));
    },
    [dispatch]
  );

  return (
    <CommentList
      offset={offset}
      limit={PAGINATION_LIMIT}
      comments={data}
      loading={loading}
      getComments={getComments}
      deleteComments={deleteComments}
    />
  );
}

export default CommentListContainer;
