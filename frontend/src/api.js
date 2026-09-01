import axios from 'axios';

// all api calls go through this, so the base url is in one place
const api = axios.create({
  baseURL: 'http://localhost:5000/api/todos',
});

export default api;
