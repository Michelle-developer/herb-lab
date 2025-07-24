import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // TODO: 部署後更換URL
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
