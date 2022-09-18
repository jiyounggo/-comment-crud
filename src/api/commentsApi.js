import axios from 'axios';

export const getCommentsApi = async () => {
  const response = await axios.get('http://localhost:4000/comments');
  return response.data;
};
