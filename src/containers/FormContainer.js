import React from "react";
import Form from "../components/Form";
import { useSelector, useDispatch } from "react-redux";
import { saveComment, updateComment } from "../modules/comments";
import { initTarget, setTarget } from "../modules/target";
import { setPage } from "../modules/page";

function FormContainer() {
  const { error } = useSelector((state) => state.comments.comment);
  const target = useSelector((state) => state.target);
  const dispatch = useDispatch();
  const onSave = (comment) => {
    dispatch(saveComment(comment));
    dispatch(initTarget());
    dispatch(setPage(1));
  };
  const onUpdate = (comment) => {
    dispatch(updateComment(comment));
    dispatch(initTarget());
  };
  const onSetTarget = (comment) => {
    dispatch(setTarget(comment));
  };

  if (error) alert("ERROR");

  return (
    <Form
      target={target}
      onSave={onSave}
      onUpdate={onUpdate}
      setTarget={onSetTarget}
    />
  );
}

export default FormContainer;
