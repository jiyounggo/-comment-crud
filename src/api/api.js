import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const api = axios.create({
  baseURL: `${API_URL}/comments`,
});

const getComments = async () => await api.get(``);
const saveComment = async (id) => await api.post(`/${id}`);
const updateComment = async (id) => await api.put(`/${id}`);
const deleteComment = async (id) => await api.delete(`/${id}`);

export { getComments, saveComment, updateComment, deleteComment };
