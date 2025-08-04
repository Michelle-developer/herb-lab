import { createContext, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import constitutionData from '../data/constitutionsData.json';
import symptomTagsData from '../data/symptomTagsData.json';
import { symptomFilterReducer, symptomFilterInitialState } from '../reducers/symptomFilterReducer';

export const ConstitutionContext = createContext();

export function ConstitutionProvider({ children }) {
  const processedConstitutions = useMemo(() => {
    return constitutionData.map((constitution) => ({
      ...constitution,
      id: crypto.randomUUID(),
      img: `/images/constitutions/img_${constitution.slug}.webp`,
    }));
  }, []);

  const [symptomState, symptomDispatch] = useReducer(
    symptomFilterReducer,
    symptomFilterInitialState
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

ConstitutionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useConstitutionContext() {
  const context = useContext(ConstitutionContext);
  if (context === undefined)
    throw new Error('ConstitutionContext was used outside of the ContextProvider.');
  return context;
}
