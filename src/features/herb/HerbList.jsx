import { useEffect, useRef } from 'react';
import { useHerbContext } from '../../contexts/HerbContext';
import HerbSearchBar from './HerbSearchBar';
import HerbNoticeBar from './HerbNoticeBar';
import HerbFilterSidebar from './HerbFilterSidebar';
import HerbCardGrid from './HerbCardGrid';
import HerbSidebarDrawer from './HerbSidebarDrawer';

function HerbList() {
  const { herbs, queryDispatch } = useHerbContext();
  const inputRef = useRef(null);

  // 初次載入資料成功後，就複製一份 rawHerbs 以進行各種操作
  useEffect(() => {
    if (herbs.length > 0) queryDispatch({ type: 'initHerbs', payload: herbs });
  }, [herbs, queryDispatch]);

  return (
    <div>
      <header className="h-screen min-h-[100vh] w-screen bg-[url(/images/img_herb_hero.png)] bg-cover bg-bottom bg-no-repeat p-8">
        <div className="relative h-full w-full">
          <div className="relative z-10 mx-auto my-6 flex w-[100%] flex-col items-center justify-center gap-4 rounded-xl border border-stone-300 bg-white/40 px-4 py-6 shadow-md backdrop-blur-[1px] sm:w-[85%] md:w-[75%]">
            <h1
              className="relative z-10 my-10 py-4 text-2xl font-semibold sm:col-span-2 lg:text-3xl"
              style={{ fontFamily: 'GenRyuMin' }}
            >
              一起探索實用的中藥知識吧！
            </h1>
            {/* 搜尋框：輸入中藥名 */}
            <HerbSearchBar ref={inputRef} className="relative z-10 col-start-2 col-end-4 mb-4" />

            {/* 說明區：搜尋中藥的注意事項 */}
            <HerbNoticeBar className="relative z-10 col-start-2 mb-2 sm:col-end-4" />
          </div>
        </div>
      </header>

      <div className="container-broad">
        {/* Drawer： Mobile 篩選條件區 */}
        <HerbSidebarDrawer className="block sm:hidden" />

        {/* Sidebar： Tablet, Desktop 篩選條件區 */}
        <div className="bg-land/80 flex rounded-xl p-4">
          <HerbFilterSidebar inputRef={inputRef} />

          {/* 中藥卡片展示區 */}
          <main className="m-2 w-full text-center sm:w-200 sm:flex-auto">
            <HerbCardGrid />
          </main>
        </div>
      </div>
    </div>
  );
}

export default HerbList;
