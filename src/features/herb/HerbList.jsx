import HerbSearchBar from "./HerbSearchBar";
import HerbNoticeBar from "./HerbNoticeBar";
import HerbFilterSidebar from "./HerbFilterSidebar";
import HerbCardGrid from "./HerbCardGrid";
import HerbSidebarDrawer from "./HerbSidebarDrawer";
import { useEffect } from "react";
import { useHerbContext } from "../../contexts/HerbContext";

function HerbList() {
  const { herbs, queryDispatch } = useHerbContext();

  // 初次載入資料成功後，就複製一份rawHerbs
  useEffect(() => {
    if (herbs.length > 0) queryDispatch({ type: "initHerbs", payload: herbs });
  }, [herbs, queryDispatch]);
  // className="relative w-screen bg-[url(../src/assets/images/brooke-cagle-Sy-bpHGSKEs-unsplash.jpg)] bg-cover bg-center p-8"
  return (
    <div className="pt-[88px]">
      <header className="relative w-screen bg-[url(../src/assets/images/jinyun-f7D-995wzkI-unsplash.jpg)] bg-cover bg-center p-8">
        {/* 遮罩層 */}
        <div className="absolute inset-x-0 inset-y-8 bg-stone-50/50"></div>

        <div className="my-6 justify-items-center">
          <h1 className="relative z-10 my-10 py-4 text-xl font-semibold sm:col-span-2 md:text-2xl lg:text-3xl">
            一起探索實用的中藥知識吧！
          </h1>
          <HerbSearchBar className="relative z-10 col-start-2 col-end-4" />
          <HerbNoticeBar className="relative z-10 hidden sm:col-start-2 sm:col-end-4 sm:inline" />
        </div>
      </header>
      <div className="container-broad">
        {/* TODO: 人物圖調整 */}
        <div className="mx-2 my-6 flex justify-between gap-2">
          <img
            className="hidden sm:w-1/3"
            src="../src/assets/images/Humaaans-research.png"
            alt="research man"
          />
          <div className="px-4 py-3 text-center text-sm text-stone-600 md:text-base">
            你搜尋過的關鍵詞：
            <span className="rounded-full bg-stone-100 px-3 py-1">當歸</span>
            <span className="rounded-full bg-stone-100 px-3 py-1">枸杞</span>
          </div>
          <HerbSidebarDrawer className="block sm:hidden" />
        </div>

        <div className="bg-land flex rounded-xl p-4">
          <HerbFilterSidebar />

          <main className="m-2 w-full text-center sm:w-200 sm:flex-auto">
            <HerbCardGrid />
          </main>
        </div>
      </div>
    </div>
  );
}

export default HerbList;
