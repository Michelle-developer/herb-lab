export const symptomFilterInitialState = {
  selectingSubgroup: {
    subgroupLabel: "",
    relatedOptions: [],
  }, //子群組modal選項渲染
  activeGroup: "", //head, facial-features, chest, abdomen, limbs-skin, others
  selectedSymptomIds: [], //勾選的症狀 ID 陣列
  highlightedConstitutionSlugs: [], //yang-deficiency, ying-deficiency, damp-heat
  displayMessage: {
    type: "", //tip, clear-all, result
    text: "",
    shown: false,
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

      //取出目前群組對應的陣列（從 state）
      const groupArray = state.totalSelectedSymptomIds[groupKey];

      //轉成Set操作，去除重複值
      const groupSet = new Set(groupArray);

      //加入或刪除symptomId
      if (isChecked) groupSet.add(symptomId);
      else groupSet.delete(symptomId);

      //轉回陣列後，再用來更新狀態
      const totalSelectedSymptomIds = {
        ...state.totalSelectedSymptomIds,
        [groupKey]: [...groupSet],
      };

      //計算總共累積的症狀數量
      const totalSelectedSymptoms = Object.values(
        totalSelectedSymptomIds,
      ).flat().length;

      console.log(
        "groupKey轉換:",
        groupKeyMap[activeGroup],
        "Total總儲存:",
        totalSelectedSymptomIds[groupKey],
      ); //TODO:

      let displayMessage = state.displayMessage;

      //偵測點擊行為，觸發提示訊息功能
      if (totalSelectedSymptoms === 2 && !state.displayMessage.shown) {
        displayMessage = {
          type: "tip",
          text: "✨ 小秘訣：可依照自身的情況做選擇，找出哪種體質最常出現哦！",
        };
      } else if (totalSelectedSymptoms === 5) {
        displayMessage = {
          type: "clear-all",
          text: "😀 你目前有5個症狀儲存在總分區，繼續保持！若你想清除，點擊刷子按鈕就行。",
        };
      } else if (totalSelectedSymptoms === 8) {
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

      const symptoms = action.payload;

      const targetSymptoms = symptoms.filter((symptom) =>
        allSymptomIds.includes(symptom.id),
      ); //透過比對id，取得該症狀的完整物件

      const results = targetSymptoms.flatMap(
        (symptom) => symptom.related_constitutions || [],
      ); //從症狀物件中取出相關體質的值，攤平成大陣列

      //將體質陣列中的各個體質取出、存成陣列，計算各個體質陣列的長度
      const yangDeficiencyCount = results.filter(
        (result) => result === "yang-deficiency",
      ).length;
      const yingDeficiencyCount = results.filter(
        (result) => result === "ying-deficiency",
      ).length;
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

    case "backToMain": {
      return {
        ...state,
        activeGroup: "",
        highlightedConstitutionSlugs: [],
      };
    }

    case "clearCurrentGroup": {
      return {
        ...state,
        selectedSymptomIds: [],
        highlightedConstitutionSlugs: [],
        totalSelectedSymptomIds: {
          head: [],
          facialFeatures: [],
          chest: [],
          abdomen: [],
          limbsSkin: [],
          others: [],
        },
      };
    }

    case "clearAll": {
      return {
        ...state,
        activeGroup: "",
        activeGroupLocked: false,
        selectedSymptomIds: [],
        highlightedConstitutionSlugs: [],
        displayMessage: {
          type: "",
          text: "",
          shown: false,
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
