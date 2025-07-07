const techHighlightsData = [
  {
    id: 1,
    title: '首頁 Hero 引導動畫',
    description: '以 Framer Motion 實現角色逐一現身與對話節奏控制，營造故事式引導體驗。',
    points: [
      '透過 useEffect + setTimeout 控制角色依序出現，模擬對話節奏。',
      '使用 Framer Motion 搭配 AnimatePresence 管理角色進出場動畫。',
    ],
    image: 'dialogue',
  },
  {
    id: 2,
    title: '中藥搜尋系統',
    description: '透過 Reducer + Context 管理多重搜尋條件，並同步 URL Query 。',
    points: [
      '利用 useReducer 拆分關鍵字與分類條件的更新邏輯。',
      '將狀態與 dispatch 封裝在 Context 中，在列表元件與側邊欄之間共享。',
      '每次搜尋會更新 URL，使用者能複製連結回到同樣的搜尋結果。',
    ],
    image: 'herb-list',
  },
  {
    id: 3,
    title: '體質圖導覽互動',
    description: 'Context 全域狀態管理搭配自訂互動區域，實現症狀統計與視覺回饋導覽。',
    points: [
      '使用 Context + Reducer 管理使用者選取的症狀 ID 。',
      '透過絕對定位熱區實作「點選部位 → 彈出症狀 → 命中體質」互動邏輯。',
      'useMemo 與 useEffect 優化命中次數計算與視覺回饋更新。',
    ],
    image: 'body-map',
  },
  {
    id: 4,
    title: '體質與中藥推薦系統',
    description: '多層級資料結構管理體質推薦邏輯，整合中藥 Context 資料串接。',
    points: [
      '體質 JSON 中加入中藥 slug 陣列，做為與 HerbContext 資料串接的橋樑。',
      '體質詳情頁使用 map 結合動態 slug，顯示對應中藥卡片。',
      '中藥卡片支援點擊進入中藥詳情頁，提供更深入的使用資訊。',
    ],
    image: 'connect',
  },
];

export default techHighlightsData;
