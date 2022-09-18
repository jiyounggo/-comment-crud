import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getComments } from '../modules/comments';

function CommentList() {
  const { data, loading, error } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  if (loading) return <div>로딩중...😴</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return data.map((comment, key) => (
    <Comment key={key}>
      <img src={comment.profile_url} alt='' />

      {comment.author}

      <CreatedAt>{comment.createdAt}</CreatedAt>

      <Content>{comment.content}</Content>

      <Button>
        <a>수정</a>
        <a>삭제</a>
      </Button>

      <hr />
    </Comment>
  ));
}

export default CommentList;

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const Button = styled.div`
  text-align: right;
  margin: 10px 0;
  & > a {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
