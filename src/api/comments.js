import axios from 'axios';

export const getComments = async () => {
  const response = await axios.get('http://localhost:4000/comments');
  return response.data;
};

export const getCommentById = async (id) => {
  const response = await axios.get(`http://localhost:4000/comments/${id}`);
  return response.data;
};

export const creactComment = async () => {
  const response = await axios.post(`http://localhost:4000/comments`);
  return response.data;
};

export const updateCommentById = async (id) => {
  const response = await axios.post(`http://localhost:4000/comments/${id}`);
  return response.data;
};

export const deleteCommentById = async (id) => {
  const response = await axios.post(`http://localhost:4000/comments/${id}`);
  return response.data;
};
