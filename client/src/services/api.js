import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor - unwrap { data: ... }
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error?.message || error.message;
    return Promise.reject({
      message,
      status: error.response?.status,
      details: error.response?.data?.error?.details,
    });
  }
);

export default api;
