import axios from 'axios';

const API_URL = 'http://localhost:5077/api';

const api = axios.create({
  baseURL: API_URL,
});

// Get all tasks
export const getTasks = async (token) => {
  return api.get('/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Create a new task
export const createTask = async (task, token) => {
  return api.post('/tasks', task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update an existing task
export const updateTask = async (task, token) => {
  return api.put(`/tasks/${task.id}`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;