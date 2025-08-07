import axiosRetry from 'axios-retry';
import axios from './axiosInstance';

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000, // 第一次1s，第二次2s，...
  retryCondition: () => true, // retry 所有錯誤（包括 Network Error）
});
