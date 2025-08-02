import PropTypes from 'prop-types';
import { useFolderContext } from './FolderContext';
import { useDemoFolderContext } from './DemoFolderContext';
import { useAuthContext } from './AuthContext';
import { createContext, useContext } from 'react';

const UnifiedFolderContext = createContext();

export function UnifiedFolderProvider({ children }) {
  const { user, isAuthReady } = useAuthContext();
  const isDemo = !user && isAuthReady; // 未登入但頁面初始化完成 ➜ demo 模式

  const { demoFolders, demoFolderIsLoading } = useDemoFolderContext();

  const { saveState, saveDispatch, folderIsLoading } = useFolderContext();

  const unifiedContextValue = {
    folders: isDemo ? demoFolders : saveState.folders,
    herbCollection: isDemo ? null : saveState.herbCollection,
    saveDispatch: isDemo ? null : saveDispatch,
    folderIsLoading: isDemo ? demoFolderIsLoading : folderIsLoading,
    isReadOnlyMode: isDemo,
  };

  // 若尚未解析完 JWT，就不要渲染任何內容（避免誤判為 Demo 模式，拿到 undefined 資料 => 白畫面）
  if (!isAuthReady) {
    return null;
  }

  return (
    <UnifiedFolderContext.Provider value={unifiedContextValue}>
      {children}
    </UnifiedFolderContext.Provider>
  );
}

UnifiedFolderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useUnifiedFolderContext() {
  const context = useContext(UnifiedFolderContext);
  if (!context) throw new Error('unifiedFolderContext was used outside of the ContextProvider.');
  return context;
}
