function HerbNoticeBar({ className }) {
  return (
    <ul className={`${className} pl-3 text-stone-800`}>
      <li>✅ 支援中文、英文、拉丁文搜尋。</li>
      <li>✅ 請以中藥的「正名」做搜尋，避免使用別名。</li>
      <li>✅ 目前收錄常用中藥 50 種，資料持續擴增中。</li>
    </ul>
  );
}

export default HerbNoticeBar;
