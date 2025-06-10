//  - 管理 query string
//  - 控制 URL（透過 useSearchParams 或 navigate）
//  - 過濾資料（原始 herbs 資料根據條件做 filter）

export const herbQueryInitialState = {
  keyword: "",
  filter: {
    nature: [],
    taste: [],
  },
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

    case "updateFilter": {
      const { key, value, herbs } = action.payload; // ex: {nature, [cold, hot]}
      // 動態更新filter篩選條件
      const newFilter = {
        ...state.filter,
        [key]: value,
      };

      // 資料映射：將key轉換為對應中藥資料的寫法
      const fieldMap = {
        nature: "nature_tag",
        taste: "taste_tag",
        constitution: "constitution_tag",
      };

      const filteredHerbs = herbs.filter((herb) => {
        // 用更新後的篩選條件，逐一檢查是否符合herb資料的屬性
        return Object.entries(newFilter).every(
          ([filterKey, selectedValues]) => {
            // 若某篩選分類未選值，視為「不加限制」，直接通過（多重篩選常見機制）
            if (!selectedValues || selectedValues.length === 0) return true;

            // 將UI傳來的篩選key，轉換為資料中的實際欄位名
            const actualHerbKey = fieldMap[filterKey]; // ex: "nature" => "nature_tag"
            // 取得herb對應欄位的值
            const herbValue = herb[actualHerbKey]; // ex: herb["nature_tag"] => "warm"

            // 若中藥的屬性值包含於選取條件中，表示符合
            return selectedValues.includes(herbValue);
          },
        );
      });

      return {
        ...state,
        filter: newFilter,
        rawHerbs: herbs,
        filteredHerbs,
      };
    }

    case "clearFilter": {
      return {
        ...state,
        filter: {
          nature: [],
          taste: [],
        },
        filteredHerbs: [],
      };
    }
  }
}
