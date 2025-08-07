import HerbCard from './HerbCard';
import HerbCardItem from './HerbCardItem';

import { useHerbContext } from '../../contexts/HerbContext';
import { useState } from 'react';
import HerbCardSkeleton from './HerbCardSkeleton';

function HerbCardGrid({ mainRef }) {
  const { queryState } = useHerbContext();
  const [visibleCount, setVisibleCount] = useState(15);
  const isFiltered = queryState.displayMode === 'result';
  const source = isFiltered ? queryState.filteredHerbs : queryState.rawHerbs;
  const displayHerbs = source.slice(0, visibleCount);

  return (
    <div ref={mainRef}>
      <ul className="mb-2 grid grid-cols-3 justify-items-center gap-4 md:gap-2 lg:grid-cols-5">
        {!displayHerbs.length &&
          Array.from({ length: 15 }).map((_, i) => <HerbCardSkeleton key={i} />)}

        {/* 預設顯示 15 個中藥 */}
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

      {/* 篩選結果大於 UI 可見結果 + 確認當前非找不到結果模式（預設模式、找到結果模式均可） => 才顯示 +5 個中藥功能按鈕 */}
      {source.length > visibleCount && queryState.displayMode !== 'no-result' && (
        <button
          className="bg-grass border-grass hover:bg-oliver my-4 w-full cursor-pointer rounded-full border-solid p-2 tracking-widest text-stone-100"
          onClick={() => setVisibleCount((count) => count + 5)}
        >
          顯示更多藥材
        </button>
      )}
      {/* <HerbCardSkeleton /> */}
    </div>
  );
}

export default HerbCardGrid;
