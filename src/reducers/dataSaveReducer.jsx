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

    // case 'updateFolder': {
    //   const updated = action.payload;
    //   const stringify = updated._id.toString();
    //   console.log('[reducer] received updateFolder:', updated);
    //   // console.log('[reducer] type', typeof updated._id);

    //   const updatedFolders = state.folders.map((folder) => {
    //     const match = folder._id === stringify;
    //     console.log(`[reducer] comparing ${folder._id} === ${stringify} → ${match}`);
    //     return match ? updated : folder;
    //   });

    //   return {
    //     ...state,
    //     folders: updatedFolders,
    //   };
    // }

    // case 'updateFolder': {
    //   const updated = action.payload;
    //   console.log('[reducer] 1 received action:', action);
    //   console.log('[reducer] 2 action.payload:', action.payload);
    //   console.log('[reducer] 3 typeof payload:', typeof action.payload);
    //   console.log('[reducer] 4 payload._id:', action.payload?._id);

    //   if (!updated._id) {
    //     console.warn('[reducer] invalid updateFolder payload:', updated);
    //     return state; // ❗不改 state，避免空資料導致畫面崩潰
    //   }

    //   const updatedId = updated._id.toString();

    //   const updatedFolders = state.folders.map((folder) => {
    //     const match = folder._id.toString() === updatedId;
    //     console.log(`[reducer] comparing ${folder._id} === ${updatedId} → ${match}`);
    //     return match ? { ...updated } : folder; // 建立新 reference
    //   });
    //   console.log('[reducer] updatedFolders:', updatedFolders);

    //   return {
    //     ...state,
    //     folders: updatedFolders,
    //   };
    // }

    case 'createFolder': {
      return {
        ...state,
        folders: [...state.folders, action.payload],
      };
    }

    default:
      return state;
  }
}
