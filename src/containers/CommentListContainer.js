import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentList from '../components/CommentList';
import { getComments } from '../modules/comments';

function CommentListContainer() {
  const { comments, comment } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments());
    console.log(comments);
  });
  return <CommentList />;
}

export default CommentListContainer;
