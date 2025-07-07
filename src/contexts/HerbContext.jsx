import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { herbQueryReducer, herbQueryInitialState } from '../reducers/herbQueryReducer';

const HerbContext = createContext();

export function HerbProvider({ children }) {
  const [herbs, setHerbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryState, queryDispatch] = useReducer(herbQueryReducer, herbQueryInitialState);

  useEffect(() => {
    async function fetchHerbData() {
      try {
        const result = await fetch('/data/herbsData.json');
        const rawData = await result.json();

        const processedHerbs = rawData.map((herb) => ({
          ...herb,
          id: crypto.randomUUID(),
          img: `/images/herbs/img_${herb.slug}.jpg`,
        }));

        setHerbs(processedHerbs);
        setIsLoading(false);
      } catch (error) {
        console.error('無法取得中藥資料 🥲:', error);
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
