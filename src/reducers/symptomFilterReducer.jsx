export const symptomFilterInitialState = {
  activeGroup: "", //head,facial-features, chest-abdomen,limbs-skin, others
  selectingSubgroup: null, //子群組，如：頭部再分為頭面、五官
  activeGroupLocked: false, //避免使用者連續切換部位
  selectedSymptomIds: [], //勾選的症狀 ID 陣列
  highlightedConstitutionSlugs: [], //yang-deficiency, ying-deficiency, damp-heat
  displayMode: "default", //default, result
  currentGroupConstitutionCount: {
    //統計每種體質出現的次數，在連續選到同一種體質給予回饋
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
    case "setGroup": {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
