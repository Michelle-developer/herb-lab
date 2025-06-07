//  - 管理 query string
//  - 控制 URL（透過 useSearchParams 或 navigate）
//  - 過濾資料（原始 herbs 資料根據條件做 filter）

export const herbQueryInitialState = {
  keyword: "",
  category: "all", // 可擴充：功效、性味、分類
  filteredHerbs: [], //根據使用者過濾條件，顯示資料
  rawHerbs: [], //複製原始資料方便利用
};

export function herbQueryReducer(state, action) {
  switch (action.type) {
    case "setKeyword":
      return {
        ...state,
        keyword: action.payload,
      };
  }
}
