import axios from 'axios';

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return 'http://localhost:5000/api/todos';
  
  // Ensure the URL ends with /api/todos
  const cleanUrl = envUrl.replace(/\/+$/, '');
  if (cleanUrl.endsWith('/api/todos')) return cleanUrl;
  return `${cleanUrl}/api/todos`;
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

export default api;
