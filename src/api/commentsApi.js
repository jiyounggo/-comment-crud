import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}`;

const api = axios.create({
  baseURL: `${API_URL}/comments`,
});

export const getCommentsApi = async () => {
  const response = await api.get(``, {
    params: { _order: 'desc', _sort: 'id' },
  });
  return response.data;
};

export const saveCommentApi = async (comment) => {
  const response = await api.post(``, comment);
  return response.data;
};
