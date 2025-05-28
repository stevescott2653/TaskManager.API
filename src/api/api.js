import axios from "axios";

const API_URL = "http://localhost:5077/api";

export const getTasks = async (token) => {
  return axios.get(`${API_URL}/task`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createTask = async (task, token) => {
  return axios.post(`${API_URL}/task`, task, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateTask = async (task, token) => {
  return axios.put(`${API_URL}/task/${task.id}`, task, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteTask = async (id, token) => {
  return axios.delete(`${API_URL}/task/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};