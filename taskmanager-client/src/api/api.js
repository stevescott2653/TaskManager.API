import axios from 'axios';

const API_URL = 'http://localhost:5077/api';

// Helper to get token from localStorage
function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const api = axios.create({
  baseURL: API_URL,
});

// Get all tasks
export const getTasks = async () => {
  return api.get('/tasks', { headers: getAuthHeader() });
};

// Create a new task
export const createTask = async (task) => {
  return api.post('/tasks', task, { headers: getAuthHeader() });
};

// Update an existing task
export const updateTask = async (task) => {
  return api.put(`/tasks/${task.id}`, task, { headers: getAuthHeader() });
};

// Delete a task
export const deleteTask = async (id) => {
  return api.delete(`/tasks/${id}`, { headers: getAuthHeader() });
};

export default api;