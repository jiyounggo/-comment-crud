import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentList from "../components/CommentList";
import { getComments } from "../modules/comments";

function CommentListContainer() {
  const { data, loading, error } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (data) return <CommentList comments={data} />;
}

export default CommentListContainer;
