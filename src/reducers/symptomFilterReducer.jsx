export const symptomFilterInitialState = {
  selectingSubgroup: {
    subgroupLabel: "",
    relatedOptions: [],
  }, //子群組modal選項渲染
  activeGroup: "", //head, facial-features, chest, abdomen, limbs-skin, others
  activeGroupLocked: false, //避免使用者連續切換部位
  selectedSymptomIds: [], //勾選的症狀 ID 陣列
  highlightedConstitutionSlugs: [], //yang-deficiency, ying-deficiency, damp-heat
  // displayMode: "default", //TODO:用不到就刪 default, result
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
      console.log("ssetActiveGroup Payload:", action.payload); //TODO:

      return {
        ...state,
        activeGroup: action.payload,
        selectingSubgroup: {
          subgroupLabel: "",
          relatedOptions: [],
        },
      };
    }

    case "symptomToggle": {
      return {
        ...state,
        selectedSymptomIds: action.payload,
      };
    }
    default:
      return state;
  }
}
