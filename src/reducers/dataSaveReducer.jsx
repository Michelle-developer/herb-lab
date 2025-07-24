export const dataSaveInitialState = {
  folders: [],
  herbCollection: [], // 為實作時間篩選標籤頁
  originFolderId: '',
  targetFolderId: '',
};

export function dataSaveReducer(state, action) {
  switch (action.type) {
    case 'initFolders': {
      return {
        ...state,
        folders: action.payload,
      };
    }

    case 'updateFolder': {
      const updated = action.payload;
      const updatedFolders = state.folders.map((folder) =>
        folder._id === updated._id ? updated : folder
      );

      return {
        ...state,
        folders: updatedFolders,
      };
    }

    default:
      return state;
  }
}
