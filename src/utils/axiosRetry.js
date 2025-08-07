import axiosRetry from 'axios-retry';
import axios from './axiosInstance';

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000, // 第一次1s，第二次2s，...
  retryCondition: (error) => true,
  //   (error) => {
  //     return error.response?.status >= 500 || !error.response;
  //   },
});
