import { useEffect, useState } from 'react';

//✅ 自訂 Hook：用來偵測「目前是否為小螢幕裝置」，可傳入斷點（預設為1024）
function useIsMobileOrTablet(breakpoint = 1024) {
  // 初始狀態：使用lazy initializer，只在第一次render計算
  // 如果當下視窗寬度 <= breakpoint（預設 1024），就設為 true
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(() => window.innerWidth <= breakpoint);

  useEffect(() => {
    //定義一個resize事件的處理函式
    const handleResize = () => {
      //每次resize時，重新計算是否 <= breakpoint，更新狀態
      setIsMobileOrTablet(() => window.innerWidth <= breakpoint);
    };

    //在component mount時，註冊resize事件監聽
    window.addEventListener('resize', handleResize);

    // ✅ 在component unmount時，清除事件監聽，避免記憶體洩漏
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]); // ✅ 如果外部傳入不同斷點值，也能自動更新效果

  // ✅ 回傳目前是否為「手機或平板」的布林值，讓外部組件使用
  return isMobileOrTablet;
}

export default useIsMobileOrTablet;
