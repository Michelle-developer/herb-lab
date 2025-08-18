function Reference() {
  return (
    <div className="to-land mt-20 h-auto w-full bg-gradient-to-r from-[#eef2e6]">
      <div className="grid grid-cols-1 items-center px-6 py-12 text-stone-600 md:grid-cols-3">
        <div className="text-sm leading-relaxed md:col-span-2">
          <p className="mb-2">
            Herb Lab
            取材自各大官方網站資料，書籍與報導。網站僅供展示與學習使用，如有需移除的內容，請與我聯繫。
          </p>
          <p>網站提供內容無法取代正規醫療，請諮詢專業醫師以獲得準確的診斷和治療方案。</p>
        </div>
        <div className="mt-4 flex justify-start space-x-4 md:mt-0 md:justify-end">
          <a
            href="https://sys01.lib.hkbu.edu.hk/cmed/mmid/index.php?lang=cht"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/logo_HKBU.svg" className="h-8" alt="香港浸會大學 Logo" />
          </a>
          <a href="https://herbaltcm.sn.polyu.edu.hk/tc/" target="_blank" rel="noreferrer">
            <img src="/images/logo_POLYU.png" className="h-8" alt="香港理工大學 Logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Reference;
