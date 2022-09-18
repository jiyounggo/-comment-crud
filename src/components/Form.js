import React, { useState } from "react";
import styled from "styled-components";

function Form({ onSave, onUpdate }) {
  const [inputs, setInputs] = useState(initialInputs);
  const handleOnChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    onSave(inputs);
    //onUpdate({...inputs, id})
  };
  return (
    <FormStyle>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="profile_url"
          value={inputs.profile_url}
          onChange={handleOnChange}
          placeholder="https://picsum.photos/id/1/50/50"
          required
        />
        <br />
        <input
          type="text"
          name="author"
          value={inputs.author}
          onChange={handleOnChange}
          placeholder="작성자"
        />
        <br />
        <textarea
          name="content"
          placeholder="내용"
          value={inputs.content}
          onChange={handleOnChange}
          required
        ></textarea>
        <br />
        <input
          type="text"
          name="createdAt"
          value={inputs.createdAt}
          onChange={handleOnChange}
          placeholder="2020-05-30"
          required
        />
        <br />
        <button type="submit">등록</button>
      </form>
    </FormStyle>
  );
}

export default Form;

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

const initialInputs = {
  profile_url: "",
  author: "",
  content: "",
  createdAt: "",
};
