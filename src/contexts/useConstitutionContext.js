import { useContext } from 'react';
import { ConstitutionContext } from './ConstitutionContext';

// 將Context封裝成Hook + 錯誤提示（超出作用範圍）
export function useConstitutionContext() {
  const context = useContext(ConstitutionContext);
  if (context === undefined)
    throw new Error('ConstitutionContext was used outside of the ContextProvider.');
  return context;
}
