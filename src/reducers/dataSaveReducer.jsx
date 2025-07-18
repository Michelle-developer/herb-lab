export const dataSaveInitialState = {
  userId: 'demo_user',
  herbId: [],
  selectedHerbId: '',
  rawFolders: [],
  fromFolderId: '',
  toFolderId: '',
};

export function dataSaveReducer(state, action) {
  switch (action.type) {
    case 'initFolders': {
      return {
        ...state,
        rawFolders: action.payload,
      };
    }

    default:
      return state;
  }
}
