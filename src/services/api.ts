import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Endereço do seu backend Node
});

// Esse código anexa o token de login automaticamente em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@MindBlog:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;