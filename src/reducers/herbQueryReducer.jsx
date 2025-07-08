//  - 管理 query string
//  - 控制 URL（透過 useSearchParams 或 navigate）
//  - 過濾資料（原始 herbs 資料根據條件做 filter）

export const herbQueryInitialState = {
  keyword: '',
  activeCategory: '', // keyword, nature, taste
  filter: {
    nature: [],
    taste: [],
  },
  filteredHerbs: [], // 根據使用者過濾條件，顯示資料
  rawHerbs: [], // 複製原始資料方便利用
  displayMode: 'default', // default, result, no-result
};

export function herbQueryReducer(state, action) {
  switch (action.type) {
    case 'initHerbs': {
      return {
        ...state,
        rawHerbs: action.payload,
      };
    }

    case 'searchHerbs': {
      const updateKeyword = action.payload.keyword.trim().toLowerCase();
      const filteredHerbs = state.rawHerbs.filter((herb) => {
        return (
          herb.name_zh.includes(updateKeyword) ||
          herb.name_en.toLowerCase().includes(updateKeyword) ||
          herb.name_lat.toLowerCase().includes(updateKeyword)
        );
      });

      return {
        ...state,
        keyword: updateKeyword,
        filteredHerbs,
        displayMode: filteredHerbs.length > 0 ? 'result' : 'no-result',
      };
    }

    case 'setActiveCategory': {
      return {
        ...state,
        activeCategory: action.payload, // keyword, nature, taste
        filter: {
          nature: [],
          taste: [],
        },
        displayMode: 'default',
      };
    }

    case 'updateFilter': {
      const { key, value } = action.payload; // ex: {nature, [cold, hot]}
      // 動態更新filter篩選條件
      const newFilter = {
        ...state.filter,
        [key]: value,
      };

      // 資料映射：將key轉換為對應中藥資料的寫法
      const fieldMap = {
        nature: 'nature_tag',
        taste: 'taste_tag',
      };

      // const herbValue = herb[actualHerbKey];
      // // 判斷是否為陣列
      // if (Array.isArray(herbValue)) {
      //   // 只要有一個屬性命中即可
      //   return herbValue.some((val) => selectedValues.includes(val));
      // } else {
      //   return selectedValues.includes(herbValue);
      // }

      const filteredHerbs = state.rawHerbs.filter((herb) => {
        // 用更新後的篩選條件，逐一檢查是否符合herb資料的屬性
        return Object.entries(newFilter).every(([filterKey, selectedValues]) => {
          // 若某篩選分類未選值，視為「不加限制」，直接通過（多重篩選機制）
          if (!selectedValues || selectedValues.length === 0) return true;

          // 將UI傳來的篩選key，轉換為資料中的實際欄位名
          const actualHerbKey = fieldMap[filterKey]; // ex: "nature" => "nature_tag"
          // 取得herb對應欄位的值
          const herbValue = herb[actualHerbKey]; // ex: herb["nature_tag"] => "warm"

          // 判斷是否為陣列
          if (Array.isArray(herbValue)) {
            // 只要有一個屬性命中即可
            return herbValue.some((v) => selectedValues.includes(v));
          } else {
            // 若中藥的屬性值包含於選取條件中，表示符合
            return selectedValues.includes(herbValue);
          }
        });
      });

      return {
        ...state,
        filter: newFilter,
        filteredHerbs,
        displayMode: filteredHerbs.length > 0 ? 'result' : 'no-result',
      };
    }

    case 'clearFilter': {
      return {
        ...state,
        filter: {
          nature: [],
          taste: [],
        },
        filteredHerbs: [], //TODO:考慮改為 state.rawHerbs
        displayMode: 'default',
      };
    }

    case 'setDisplayMode': {
      return {
        ...state,
        displayMode: action.payload,
      };
    }

    default:
      return state;
  }
}
