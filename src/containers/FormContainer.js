import React from "react";
import Form from "../components/Form";
import { useSelector, useDispatch } from "react-redux";
import { saveComment, updateComment } from "../modules/comments";

function FormContainer() {
  const { data, loading, error } = useSelector(
    (state) => state.comments.comment
  );
  const dispatch = useDispatch();
  const onSave = (comment) => {
    dispatch(saveComment(comment));
  };
  const onUpdate = (comment) => {
    dispatch(updateComment(comment));
  };

  return <Form onSave={onSave} onUpdate={onUpdate} />;
}

export default FormContainer;
