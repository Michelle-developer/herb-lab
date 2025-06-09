//  - 管理 query string
//  - 控制 URL（透過 useSearchParams 或 navigate）
//  - 過濾資料（原始 herbs 資料根據條件做 filter）

export const herbQueryInitialState = {
  keyword: "",
  category: "",
  filteredHerbs: [], //根據使用者過濾條件，顯示資料
  rawHerbs: [], //複製原始資料方便利用
};

export function herbQueryReducer(state, action) {
  switch (action.type) {
    case "searchHerbs": {
      const updateKeyword = action.payload.keyword.trim().toLowerCase();
      const setRawHerbs = action.payload.herbs; //HerbList拿context資料傳上來
      const filterHerbs = setRawHerbs.filter((herb) => {
        return (
          herb.name_zh.includes(updateKeyword) ||
          herb.name_en.toLowerCase().includes(updateKeyword) ||
          herb.name_lat.toLowerCase().includes(updateKeyword)
        );
      });

      return {
        ...state,
        keyword: updateKeyword,
        rawHerbs: setRawHerbs,
        filteredHerbs: filterHerbs,
      };
    }

    case "categorizeHerbs": {
      const updateCategory = action.payload.category;
      const setRawHerbs = action.payload.herbs; //HerbList拿context資料傳上來
      const filterHerbs = setRawHerbs.filter(
        (herb) => herb.nature_tag === updateCategory,
      );
      return {
        ...state,
        category: updateCategory,
        rawHerbs: setRawHerbs,
        filteredHerbs: filterHerbs,
      };
    }
  }
}
