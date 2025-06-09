import { createContext, useContext, useReducer } from "react";
import herbsTestData from "../assets/herbsTestData.json";
import {
  herbQueryReducer,
  herbQueryInitialState,
} from "../reducers/herbQueryReducer";

const herbsRawData = herbsTestData.herbs;
const processedHerbs = herbsRawData.map((herb) => ({
  ...herb,
  id: crypto.randomUUID(),
  img: `assets/images/herbs/img_${herb.slug}.jpg`,
}));

const HerbContext = createContext();

export function HerbProvider({ children }) {
  const [queryState, queryDispatch] = useReducer(
    herbQueryReducer,
    herbQueryInitialState,
  );

  return (
    <HerbContext.Provider
      value={{ herbs: processedHerbs, queryState, queryDispatch }}
    >
      {children}
    </HerbContext.Provider>
  );
}

export function useHerbContext() {
  const context = useContext(HerbContext);
  if (context === undefined)
    throw new Error("HerbContext was used outside of the ContextProvider.");
  return context;
}
