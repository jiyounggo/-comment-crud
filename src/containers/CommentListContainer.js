import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentList from '../components/CommentList';
import { updateComment, deleteComment, getComments } from '../modules/comments';

function CommentListContainer() {
  const { comments, comment } = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const onDelete = (id) => dispatch(deleteComment(id));
  const onUpdate = (id) => dispatch(updateComment(id));

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch, comment.data]);

  if (comments.loading) return <div>로딩중...</div>;
  if (comments.error) return <div>에러 발생!</div>;
  if (comments.data) return <CommentList comments={comments.data} onDelete={onDelete} onUpdate={onUpdate} />;
}

export default CommentListContainer;
