import { createContext, useContext, useMemo, useReducer } from "react";
import constitutionData from "../data/constitutionsData.json";
import symptomTagsData from "../data/symptomTagsData.json";
import {
  symptomFilterReducer,
  symptomFilterInitialState,
} from "../reducers/symptomFilterReducer";

const ConstitutionContext = createContext();

export function ConstitutionProvider({ children }) {
  const processedConstitutions = useMemo(() => {
    return constitutionData.map((constitution) => ({
      ...constitution,
      id: crypto.randomUUID(),
      img: `/images/constitutions/img_${constitution.slug}.png`,
    }));
  }, []);

  const [symptomState, symptomDispatch] = useReducer(
    symptomFilterReducer,
    symptomFilterInitialState,
  );

  return (
    <ConstitutionContext.Provider
      value={{
        constitutions: processedConstitutions,
        symptoms: symptomTagsData,
        symptomState,
        symptomDispatch,
      }}
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
