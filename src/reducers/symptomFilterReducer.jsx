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
    type: "", //tip, clear-all, result
    text: "",
    shown: false,
  },
  currentGroupConstitutionCount: {
    //統計每種體質出現的次數，在單一部位群組連續選到同一種體質給予回饋
    yangDeficiency: 0,
    yingDeficiency: 0,
    dampHeat: 0,
  },
  totalSelectedSymptomIds: {
    head: [],
    facialFeatures: [],
    chest: [],
    abdomen: [],
    limbsSkin: [],
    others: [],
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
    //展開部位次選單Modal功能
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

    //觸發症狀標籤選單Drawer功能
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

    //觸發體質卡片高亮功能
    case "setHighlightCard": {
      console.log("highlightedConstitutionSlugs:", action.payload); //TODO:
      return {
        ...state,
        highlightedConstitutionSlugs: action.payload,
      };
    }

    case "symptomToggle": {
      const symptomId = action.payload.symptomId;
      console.log("Reducer:", "體質頁傳上來的toggle值", symptomId); //TODO:

      const newSelected = action.payload.newSelected;
      const isChecked = action.payload.isChecked;

      const activeGroup = state.activeGroup;
      const groupKeyMap = {
        head: "head",
        "facial-features": "facialFeatures",
        chest: "chest",
        abdomen: "abdomen",
        "limbs-skin": "limbsSkin",
        others: "others",
      };

      //透過對照Map，將JSON的key，轉成症狀物件的key
      const groupKey = groupKeyMap[activeGroup]; // 將 "facial-features" 轉成 "facialFeatures"

      // 先從現有狀態複製舊資料
      const totalSelectedSymptomIds = {
        ...state.totalSelectedSymptomIds,
        [groupKey]: new Set(state.totalSelectedSymptomIds[groupKey]), // clone現有的Set
      };
      //再加入或刪除當前最新值
      if (isChecked) {
        totalSelectedSymptomIds[groupKey].add(symptomId);
      } else {
        totalSelectedSymptomIds[groupKey].delete(symptomId);
      }

      // const totalSymptomsAmount = Object.values(totalSelectedSymptomIds).reduce(
      //   (sum, set) => {
      //     if (!(set instanceof Set)) {
      //       console.warn("⚠️ 不是Set：", set);
      //       return sum;
      //     }
      //     return sum + set.size;
      //   },
      //   0,
      // );

      // // const totalSymptomsAmount = Object.values(totalSelectedSymptomIds).reduce(
      // //   (sum, set) => sum + set.size,
      // //   0,
      // // );
      // console.log("totalSymptomsAmount", totalSymptomsAmount); //TODO:

      console.log(
        "groupKey轉換:",
        groupKeyMap[activeGroup],
        "Total總儲存:",
        totalSelectedSymptomIds[groupKey],
      ); //TODO:

      let displayMessage = state.displayMessage;

      //偵測點擊行為，觸發提示訊息功能
      if (newSelected.length === 2 && !state.displayMessage.shown) {
        displayMessage = {
          type: "tip",
          text: "✨ 小秘訣：可依照自身的情況做選擇，找出哪種體質最常出現哦！",
        };
      } else if (newSelected.length === 5) {
        displayMessage = {
          type: "clear-all",
          text: "😀 你目前有5個症狀儲存在總分區，繼續保持！若你想清除，點擊刷子按鈕就行。",
        };
      } else if (newSelected.length === 8) {
        displayMessage = {
          type: "result",
          text: "😀 你目前有8個症狀儲存在總分區了，要不要來看看結果？點擊小人按鈕就行。",
        };
      }

      return {
        ...state,
        selectedSymptomIds: newSelected,
        displayMessage,
        totalSelectedSymptomIds,
      };
    }

    //清除提示訊息，並記錄已顯示過，避免出現兩次以上
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

    //計算儲存的所有症狀，分別對應各體質的總次數（已用Set去除重複）
    case "setTotalConstitutionCount": {
      const totalSelectedSymptomIds = state.totalSelectedSymptomIds;
      const allSymptomIds = Object.values(totalSelectedSymptomIds).flatMap(
        (set) => [...set],
      ); // 從各部位將值取出來，成為「Set的陣列」 > 每個Set用展開運算子"..."攤平轉成大陣列

      const symptoms = action.payload; //symptoms

      const targetSymptoms = symptoms.filter((symptom) =>
        allSymptomIds.includes(symptom.id),
      ); //透過比對id，取得該症狀的完整物件

      const results = targetSymptoms.flatMap(
        (symptom) => symptom.related_constitutions || [],
      ); //從症狀物件中取出相關體質的值，攤平成大陣列

      const yangDeficiencyCount = results.filter(
        (result) => result === "yang-deficiency",
      ).length; //取出體質陣列中的陽虛，計算陽虛陣列的長度

      const yingDeficiencyCount = results.filter(
        (result) => result === "ying-deficiency",
      ).length; //取出體質陣列中的陽虛，計算陽虛陣列的長度

      const dampHeatCount = results.filter(
        (result) => result === "damp-heat",
      ).length;

      return {
        ...state,
        totalConstitutionCount: {
          yangDeficiency: yangDeficiencyCount,
          yingDeficiency: yingDeficiencyCount,
          dampHeat: dampHeatCount,
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
