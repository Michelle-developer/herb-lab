export const symptomFilterInitialState = {
  selectingSubgroup: {
    subgroupLabel: "",
    relatedOptions: [],
  }, //子群組modal選項渲染
  activeGroup: "", //head, facial-features, chest, abdomen, limbs-skin, others
  activeGroupLocked: false, //避免使用者連續切換部位（中大螢幕版面）
  selectedSymptomIds: [], //勾選的症狀 ID 陣列
  highlightedConstitutionSlugs: [], //yang-deficiency, ying-deficiency, damp-heat
  displayMessage: {
    type: "", //tip, save, clear-all
    text: "",
    shown: false,
  },
  currentGroupConstitutionCount: {
    //統計每種體質出現的次數，在單一部位群組連續選到同一種體質給予回饋
    yangDeficiency: 0,
    yingDeficiency: 0,
    dampHeat: 0,
  },
  totalConstitutionCount: {
    //所有區域勾選過的症狀加總後，統計體質命中總分，用於最終引導使用者的網頁瀏覽行為
    yangDeficiency: 0,
    yingDeficiency: 0,
    dampHeat: 0,
  },
};

export function symptomFilterReducer(state, action) {
  switch (action.type) {
    case "setSubgroup": {
      const options = [
        { subgroupLabel: "head", relatedOptions: ["head", "facial-features"] },
        { subgroupLabel: "chest", relatedOptions: ["chest", "limbs-skin"] },
        {
          subgroupLabel: "abdomen",
          relatedOptions: ["abdomen", "limbs-skin"],
        },
        {
          subgroupLabel: "limbs-skin",
          relatedOptions: ["limbs-skin", "others"],
        },
      ];

      console.log("setSubgroup Payload:", action.payload); //TODO:

      const subgroupLabel = action.payload;
      const match = options.find(
        (option) => option.subgroupLabel === subgroupLabel,
      );
      const relatedOptions = match ? match.relatedOptions : [];

      return {
        ...state,
        selectingSubgroup: {
          subgroupLabel,
          relatedOptions,
        },
      };
    }

    case "setActiveGroup": {
      console.log("setActiveGroup Payload:", action.payload); //TODO:

      return {
        ...state,
        activeGroup: action.payload,
        selectingSubgroup: {
          subgroupLabel: "",
          relatedOptions: [],
        },
      };
    }

    case "setHighlightCard": {
      console.log("highlightedConstitutionSlugs:", action.payload);
      return {
        ...state,
        highlightedConstitutionSlugs: action.payload,
      };
    }

    case "symptomToggle": {
      const newSelected = action.payload;

      let displayMessage = state.displayMessage;

      if (newSelected.length === 2 && !state.displayMessage.shown) {
        displayMessage = {
          type: "tip",
          text: "✨ 小秘訣：可依照自身的情況做選擇，找出哪種體質最常出現哦！",
        };
      } else if (newSelected.length === 10 && !state.displayMessage.shown) {
        displayMessage = {
          type: "clear-all",
          text: "🧼 你目前有10個症狀儲存在總分區。想清理一下嗎？點擊清空按鈕，可以重新累計哦！",
        };

        console.log(
          "訊息種類觸發",
          displayMessage.type,
          "訊息內容觸發:",
          displayMessage.text,
        ); //TODO:
      }

      return {
        ...state,
        selectedSymptomIds: newSelected,
        displayMessage,
      };
    }

    case "clearDisplayMessage": {
      return {
        ...state,
        displayMessage: {
          type: "",
          text: "",
          shown: true,
        },
      };
    }

    case "clearActiveGroup": {
      return {
        ...state,
        activeGroup: "",
        selectedSymptomIds: [],
        highlightedConstitutionSlugs: [],
        currentGroupConstitutionCount: {
          yangDeficiency: 0,
          yingDeficiency: 0,
          dampHeat: 0,
        },
      };
    }

    default:
      return state;
  }
}
