import React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Form from "../components/Form";
import { postCommentsThunk } from "../redux/modules/comments";

function FormContainer() {
  const { data, loading, error } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  const postComments = useCallback(
    (data) => {
      dispatch(postCommentsThunk(data));
    },
    [dispatch]
  );
  return <Form postComments={postComments} />;
}

export default FormContainer;
