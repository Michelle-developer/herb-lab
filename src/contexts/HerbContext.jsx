import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import axios from '../utils/axiosInstance';
import { herbQueryReducer, herbQueryInitialState } from '../reducers/herbQueryReducer';

const HerbContext = createContext();

export function HerbProvider({ children }) {
  const [queryState, queryDispatch] = useReducer(herbQueryReducer, herbQueryInitialState);

  const [herbs, setHerbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const retryCountRef = useRef(0); // 保留計數狀態
  const retryIntervalRef = useRef(null);
  const MAX_RETRIES = 3;

  useEffect(() => {
    async function fetchHerbData() {
      try {
        const res = await axios.get('/herbs');
        // 對應後端資料結構 res.status(200).json({...data: {herbs}})
        const data = res.data.data.herbs;

        setHerbs(data);
        setHasError(false); // 成功後清除錯誤狀態

        // 清除 interval 與 retry count
        if (retryIntervalRef.current) {
          clearInterval(retryIntervalRef.current);
          retryIntervalRef.current = null;
        }
        retryCountRef.current = 0;
      } catch (err) {
        console.error('無法取得中藥資料 🥲:', err);
        setHasError(true);

        // 如果目前沒有 retryIntervalRef，且重試次數小於3次，才設置 retryIntervalRef，避免無限迴圈
        if (!retryIntervalRef.current && retryCountRef.current < MAX_RETRIES) {
          retryIntervalRef.current = setInterval(() => {
            retryCountRef.current++;
            if (retryCountRef.current >= MAX_RETRIES) {
              clearInterval(retryIntervalRef.current);
              retryIntervalRef.current = null;
              return;
            }
            fetchHerbData();
          }, 5000);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchHerbData();
    return () => {
      if (retryIntervalRef.current) clearInterval(retryIntervalRef.current); // 清除倒數計時器
    };
  }, []);

  return (
    <HerbContext.Provider
      value={{ herbs, isLoading, setIsLoading, hasError, queryState, queryDispatch }}
    >
      {children}
    </HerbContext.Provider>
  );
}

export function useHerbContext() {
  const context = useContext(HerbContext);
  if (context === undefined)
    throw new Error('HerbContext was used outside of the ContextProvider.');
  return context;
}
