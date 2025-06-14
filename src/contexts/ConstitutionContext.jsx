import { createContext, useContext, useMemo } from "react";
import constitutionTestData from "../data/constitutionsTestData.json";

const ConstitutionContext = createContext();

export function ConstitutionProvider({ children }) {
  const processedConstitutions = useMemo(() => {
    return constitutionTestData.map((constitution) => ({
      ...constitution,
      id: crypto.randomUUID(),
      img: `assets/images/constitutions/img_${constitution.slug}.jpg`,
    }));
  }, []);

  return (
    <ConstitutionContext.Provider
      value={{ constitutions: processedConstitutions }}
    >
      {children}
    </ConstitutionContext.Provider>
  );
}

export function useConstitutionContext() {
  const context = useContext(ConstitutionContext);
  if (context === undefined)
    throw new Error(
      "ConstitutionContext was used outside of the ContextProvider.",
    );
  return context;
}
