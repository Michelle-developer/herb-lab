import HerbCard from './HerbCard';
import HerbCardItem from './HerbCardItem';

import { useHerbContext } from '../../contexts/HerbContext';
import { useState } from 'react';

function HerbCardGrid() {
  const { queryState } = useHerbContext();
  const [visibleCount, setVisibleCount] = useState(10);
  const isFiltered = queryState.displayMode === 'result';
  const source = isFiltered ? queryState.filteredHerbs : queryState.rawHerbs;
  const displayHerbs = source.slice(0, visibleCount);

  return (
    <div>
      <ul className="mb-2 grid grid-cols-3 justify-items-center gap-2 lg:grid-cols-5">
        {/* 預設顯示 10 個中藥 */}
        {queryState.displayMode === 'default' &&
          displayHerbs.map((herb) => <HerbCardItem herb={herb} key={herb._id} />)}

        {/* 顯示中藥篩選結果 */}
        {queryState.displayMode === 'result' && <HerbCard displayHerbs={displayHerbs} />}

        {/* 顯示找不到中藥畫面 */}
        {queryState.displayMode === 'no-result' && (
          <div className="col-span-5 my-4 w-[30%]">
            <img
              src="/images/img_error.webp"
              title="舉白旗的小黑狗"
              alt="舉白旗示意找不到中藥，露出無辜眼神的小黑狗"
            />
            <p>我們找不到你查詢的中藥 🥲</p>
          </div>
        )}
      </ul>

      {/* 篩選結果大於 UI 可見結果 + 確認當前為呈現結果模式（排除預設模式、無結果模式） => 才顯示 +5 個中藥功能按鈕 */}
      {source.length > visibleCount && queryState.displayMode == 'result' && (
        <button
          className="bg-grass border-grass hover:bg-oliver my-4 w-full cursor-pointer rounded-full border-solid p-2 text-stone-100"
          onClick={() => setVisibleCount((count) => count + 5)}
        >
          顯示更多藥材
        </button>
      )}
    </div>
  );
}

export default HerbCardGrid;
