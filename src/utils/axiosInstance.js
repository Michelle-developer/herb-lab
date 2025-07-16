import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api', // TODO: 部署後更換URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
