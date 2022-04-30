import axios from 'axios';
import SegurancaService from '../services/SegurancaService';

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_BACKEND,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  let token = SegurancaService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));

export default api;