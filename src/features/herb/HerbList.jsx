import { useEffect, useRef } from 'react';
import { useHerbContext } from '../../contexts/HerbContext';
import HerbSearchBar from './HerbSearchBar';
import HerbNoticeBar from './HerbNoticeBar';
import HerbFilterSidebar from './HerbFilterSidebar';
import HerbCardGrid from './HerbCardGrid';
import HerbSidebarDrawer from './HerbSidebarDrawer';
import {
  FolderTree,
  HandHeart,
  HousePlus,
  Save,
  SquareMousePointer,
  StepForward,
} from 'lucide-react';

function HerbList() {
  const { herbs, queryDispatch } = useHerbContext();
  const inputRef = useRef(null);
  const mainRef = useRef(null);

  // (1) 初次載入資料成功後，就複製一份 rawHerbs 以進行各種操作
  useEffect(() => {
    if (herbs.length > 0) queryDispatch({ type: 'initHerbs', payload: herbs });
  }, [herbs, queryDispatch]);

  return (
    <div>
      {/* (2) 關鍵字搜尋區 */}
      <header
        className="h-auto w-screen bg-[url(/images/img_herb_hero.webp)] bg-cover bg-bottom bg-no-repeat p-8"
        loading="lazy"
      >
        <div className="relative h-full w-full">
          <div className="relative z-10 mx-auto my-6 flex w-[100%] flex-col items-center justify-center gap-4 rounded-xl border border-stone-300 bg-white/40 px-4 py-6 shadow-md backdrop-blur-[1px] sm:w-[85%] md:w-[75%]">
            {/* 搜尋框：輸入中藥名 */}
            <HerbSearchBar
              ref={inputRef} // 定位點（搜尋框元件裡透過 forwardRef 把定位點傳出來）
              mainRef={mainRef} // 觸發點
              className="relative z-10 col-start-2 col-end-4 mb-4"
            />

            {/* 說明區：搜尋中藥的注意事項 */}
            <HerbNoticeBar className="relative z-10 col-start-2 mb-2 sm:col-end-4" />
            <div className="bg-jade h-0.5 w-4/5"></div>
            <div className="my-4 mb-4 flex items-center justify-center gap-1 sm:gap-2">
              <div className="sm:bg-jade hidden max-w-28 flex-col rounded-lg sm:mr-4 sm:block sm:p-2 sm:py-2">
                <HandHeart className="text-stone-400" size={28} strokeWidth={1} />
                <p
                  className="text-oliver px-4 text-center font-semibold"
                  style={{ fontFamily: 'GenRyuMin' }}
                >
                  中藥卡片收藏步驟
                </p>
              </div>

              <div className="sm:border-jade max-w-28 flex-col rounded-lg sm:border-1 sm:p-2">
                <SquareMousePointer className="text-grass" strokeWidth={1} />
                <p className="hidden pl-4 sm:block" style={{ fontFamily: 'GenRyuMin' }}>
                  點選中藥卡片
                </p>
                <p className="block sm:hidden" style={{ fontFamily: 'GenRyuMin' }}>
                  點選
                </p>
              </div>
              <StepForward className="text-jade" />

              <div className="sm:border-jade max-w-28 flex-col rounded-lg sm:border-1 sm:p-2">
                <Save className="text-grass" strokeWidth={1} />
                <p className="hidden pl-4 sm:block" style={{ fontFamily: 'GenRyuMin' }}>
                  按下儲存按鈕
                </p>
                <p className="block sm:hidden" style={{ fontFamily: 'GenRyuMin' }}>
                  儲存
                </p>
              </div>
              <StepForward className="text-jade" />

              <div className="sm:border-jade max-w-28 flex-col rounded-lg sm:border-1 sm:p-2">
                <HousePlus className="text-grass" strokeWidth={1} />
                <p className="hidden pl-4 sm:block" style={{ fontFamily: 'GenRyuMin' }}>
                  登入我的實驗室
                </p>
                <p className="block sm:hidden" style={{ fontFamily: 'GenRyuMin' }}>
                  登入
                </p>
              </div>
              <StepForward className="text-jade" />

              <div className="sm:border-jade max-w-28 flex-col rounded-lg sm:border-1 sm:p-2">
                <FolderTree className="text-grass" strokeWidth={1} />
                <p className="hidden pl-4 sm:block" style={{ fontFamily: 'GenRyuMin' }}>
                  隨心所欲分類
                </p>
                <p className="block sm:hidden" style={{ fontFamily: 'GenRyuMin' }}>
                  分類
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-broad my-8">
        {/* (3-1) Drawer： Mobile 篩選條件區 */}
        <HerbSidebarDrawer className="block sm:hidden" />

        {/* (3-2) Sidebar： Tablet, Desktop 篩選條件區 */}
        <div className="bg-land/80 flex rounded-xl p-4">
          <HerbFilterSidebar inputRef={inputRef} />

          {/* (4) 中藥卡片展示區 */}
          <main className="m-2 w-full text-center sm:w-200 sm:flex-auto">
            <HerbCardGrid mainRef={mainRef} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default HerbList;
