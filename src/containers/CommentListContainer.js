import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentList from "../components/CommentList";
import { deleteComment, getComments } from "../modules/comments";
import { setTarget } from "../modules/target";
import { PAGE_LIMIT } from "../common/constant";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { setPage } from "../modules/page";

function CommentListContainer() {
  const { comments, comment } = useSelector((state) => state.comments);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const onDelete = (id) => {
    dispatch(deleteComment(id));
    dispatch(setPage(1));
  };
  const onSetTarget = (comment) => {
    dispatch(setTarget(comment));
  };

  useEffect(() => {
    dispatch(getComments({ _page: page, _limit: PAGE_LIMIT }));
  }, [dispatch, comment.data, page]);

  if (comments.loading) return <Loading />;
  if (comments.error) return <Error />;
  if (comments.data)
    return (
      <CommentList
        comments={comments.data}
        onDelete={onDelete}
        onSetTarget={onSetTarget}
      />
    );
}

export default CommentListContainer;
