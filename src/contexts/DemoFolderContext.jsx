import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

const DemoFolderContext = createContext();

export function DemoFolderProvider({ children }) {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Demo 模式（未登入，Read only）
  useEffect(() => {
    async function fetchDemoFolder() {
      try {
        const res = await axios.get('/my-lab/demo/folders');
        const data = res.data.data.filteredFolders;

        setFolders(data);
      } catch (err) {
        console.error('無法取得資料夾 🥲:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDemoFolder();
  }, []);

  return (
    <DemoFolderContext.Provider
      value={{
        demoFolders: folders,
        demoFolderIsLoading: isLoading,
      }}
    >
      {children}
    </DemoFolderContext.Provider>
  );
}

export function useDemoFolderContext() {
  const context = useContext(DemoFolderContext);
  if (context === undefined)
    throw new Error('DemoFolderContext was used outside of the DemoFolderProvider.');
  return context;
}
