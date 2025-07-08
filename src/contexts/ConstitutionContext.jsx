import { createContext, useMemo, useReducer } from 'react';
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
      img: `/images/constitutions/img_${constitution.slug}.png`,
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
