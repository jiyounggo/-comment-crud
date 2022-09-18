import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const api = axios.create({
  baseURL: `${API_URL}/comments`,
  params: { _order: "desc", _sort: "id" },
});

const getComments = async (params) => await api.get(``, { params });
const saveComment = async (comment) => api.post(``, comment);
const updateComment = async (comment) =>
  await api.put(`/${comment.id}`, comment);
const deleteComment = async (id) => await api.delete(`/${id}`);

export { getComments, saveComment, updateComment, deleteComment };
