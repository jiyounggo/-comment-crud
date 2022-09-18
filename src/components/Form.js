import React from "react";
import { useState } from "react";
import styled from "styled-components";

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }
  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }
  & > form > input[type="text"] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }
  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

const initialFormState = {
  profile_url: "",
  author: "",
  content: "",
  createdAt: "",
};

function Form({ postComments }) {
  const [formState, setFormState] = useState(initialFormState);

  const handleOnChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postComments(formState);
    setFormState(initialFormState);
  };
  return (
    <FormStyle>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="profile_url"
          placeholder="https://picsum.photos/id/1/50/50"
          required
          value={formState.profile_url}
          onChange={handleOnChange}
        />
        <br />
        <input
          type="text"
          name="author"
          placeholder="작성자"
          value={formState.author}
          onChange={handleOnChange}
        />
        <br />
        <textarea
          name="content"
          placeholder="내용"
          required
          value={formState.content}
          onChange={handleOnChange}
        ></textarea>
        <br />
        <input
          type="text"
          name="createdAt"
          placeholder="2020-05-30"
          required
          value={formState.createdAt}
          onChange={handleOnChange}
        />
        <br />
        <button type="submit">등록</button>
      </form>
    </FormStyle>
  );
}

export default Form;
