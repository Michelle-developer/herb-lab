import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import axios from '../utils/axiosInstance';
import { dataSaveReducer, dataSaveInitialState } from '../reducers/dataSaveReducer';
import { useAuthContext } from './AuthContext';

const FolderContext = createContext();

export function FolderProvider({ children }) {
  const { user, isAuthReady } = useAuthContext();
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveState, saveDispatch] = useReducer(dataSaveReducer, dataSaveInitialState);

  useEffect(() => {
    if (!isAuthReady) return;
    if (!user) return;

    async function fetchFolderData() {
      try {
        const res = await axios.get('/my-lab/folders', { withCredentials: true });
        const data = res.data.data.folders;

        setFolders(data);
      } catch (err) {
        console.error('無法取得資料夾 🥲:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFolderData();
  }, [user, isAuthReady]);

  return (
    <FolderContext.Provider value={{ folders, isLoading, saveState, saveDispatch }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolderContext() {
  const context = useContext(FolderContext);
  if (context === undefined)
    throw new Error('FolderContext was used outside of the FolderProvider.');
  return context;
}
