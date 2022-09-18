import React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CommentList from "../components/CommentList";
import { getCommentsThunk } from "../redux/modules/comments";

function CommentListContainer() {
  const comments = useSelector((state) => state.comments.data);
  const dispatch = useDispatch();

  const getComments = useCallback(() => {
    dispatch(getCommentsThunk());
  }, [dispatch]);

  return <CommentList comments={comments} getComments={getComments} />;
}

export default CommentListContainer;
