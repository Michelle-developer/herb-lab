import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import axios from '../utils/axiosInstance';
import { dataSaveReducer, dataSaveInitialState } from '../reducers/dataSaveReducer';
import { useAuthContext } from './AuthContext';

const FolderContext = createContext();

export function FolderProvider({ children }) {
  const { isAuthReady, user } = useAuthContext();
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

        // 初次載入資料成功後，就儲存一份 folders 以進行各種操作
        // 集中初始化：因為HerbDetail、MyLabLayout都需要
        saveDispatch({ type: 'initFolders', payload: data });
      } catch (err) {
        console.error('無法取得資料夾 🥲:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFolderData();
  }, [isAuthReady, user]);

  return (
    <FolderContext.Provider
      value={{ originFolders: folders, folderIsLoading: isLoading, saveState, saveDispatch }}
    >
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
