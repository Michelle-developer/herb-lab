function Reference() {
  return (
    <div className="to-land mt-20 h-auto w-full bg-gradient-to-r from-[#eef2e6]">
      <div className="grid grid-cols-1 items-center px-6 py-12 text-stone-800 md:grid-cols-3">
        <div className="text-sm leading-relaxed md:col-span-2">
          Herb
          Lab取材自各大官方網站資料，書籍與報導。網站內容僅供參考，請諮詢專業醫師以獲得準確的診斷和治療方案。網站僅供展示與學習使用，如有需移除的內容，請與我聯繫，謝謝。
        </div>
        <div className="mt-4 flex justify-start space-x-4 md:mt-0 md:justify-end">
          <img src="/images/logo_HKBU.svg" className="h-8" alt="香港浸會大學 Logo" />
          <img src="/images/logo_POLYU.png" className="h-8" alt="香港理工大學 Logo" />
        </div>
      </div>
    </div>
  );
}

export default Reference;
