export const dataSaveInitialState = {
  folders: [],
  herbCollection: [], // 為實作時間篩選標籤頁
};

export function dataSaveReducer(state, action) {
  switch (action.type) {
    case 'initFolders': {
      const folders = action.payload;
      const allHerbs = folders.flatMap((folder) =>
        folder.items.map((item) => ({
          ...item,
          folderId: folder._id,
          folderName: folder.name,
        }))
      );

      return {
        ...state,
        folders,
        herbCollection: allHerbs,
      };
    }

    // 使用時機：資料夾改名，儲存、移動、刪除中藥
    case 'updateFolder': {
      const updated = action.payload;

      const updatedFolders = state.folders.map((folder) =>
        folder._id === updated._id ? updated : folder
      );

      const updateAllHerbs = updatedFolders.flatMap((folder) =>
        folder.items.map((item) => ({
          ...item,
          folderId: folder._id,
          folderName: folder.name,
        }))
      );

      return {
        ...state,
        folders: updatedFolders,
        herbCollection: updateAllHerbs,
      };
    }

    case 'createFolder': {
      return {
        ...state,
        folders: [...state.folders, action.payload],
      };
    }

    case 'deleteFolder': {
      const deleted = action.payload;

      const updatedFolders = state.folders.filter((folder) => folder._id !== deleted._id);

      const updateAllHerbs = updatedFolders.flatMap((folder) =>
        folder.items.map((item) => ({
          ...item,
          folderId: folder._id,
          folderName: folder.name,
        }))
      );

      return {
        ...state,
        folders: updatedFolders,
        herbCollection: updateAllHerbs,
      };
    }

    default:
      return state;
  }
}
