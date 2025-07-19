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

    case 'addItemToFolder': {
      const { folderId, itemId } = action.payload;
      const updatedFolders = state.folders.map((folder) => {
        if (folder._id === folderId) {
          return {
            ...folder,
            items: [
              ...folder.items,
              {
                herbId: itemId,
                isProtected: false,
                addedAt: new Date().toISOString(),
              },
            ],
          };
        } else return folder;
      });

      return {
        ...state,
        folders: updatedFolders,
      };
    }

    default:
      return state;
  }
}
