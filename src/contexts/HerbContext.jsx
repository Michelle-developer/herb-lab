import { createContext, useContext } from "react";
import herbsTestData from "../assets/herbsTestData.json";

const herbsRawData = herbsTestData.herbs;
const processedHerbs = herbsRawData.map((herb) => ({
  ...herb,
  id: crypto.randomUUID(),
  img: `assets/images/img_${herb.slug}.jpg`,
}));

const HerbContext = createContext();

export function HerbProvider({ children }) {
  return (
    <HerbContext.Provider value={{ herbs: processedHerbs }}>
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
