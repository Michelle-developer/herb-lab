import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import axios from '../utils/axiosInstance';
import { herbQueryReducer, herbQueryInitialState } from '../reducers/herbQueryReducer';

const HerbContext = createContext();

export function HerbProvider({ children }) {
  const [herbs, setHerbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryState, queryDispatch] = useReducer(herbQueryReducer, herbQueryInitialState);

  useEffect(() => {
    async function fetchHerbData() {
      try {
        const res = await axios.get('/herbs');
        // 對應後端資料結構 res.status(200).json({...data: {herbs}})
        const data = res.data.data.herbs;

        setHerbs(data);
      } catch (error) {
        console.error('無法取得中藥資料 🥲:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHerbData();
  }, []);

  return (
    <HerbContext.Provider value={{ herbs, isLoading, queryState, queryDispatch }}>
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
