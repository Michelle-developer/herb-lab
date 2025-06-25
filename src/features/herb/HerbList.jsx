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
  // className="relative w-screen bg-[url(/images/brooke-cagle-Sy-bpHGSKEs-unsplash.jpg)] bg-cover bg-center p-8"
  return (
    <div>
      <header className="h-screen min-h-[100vh] w-screen bg-[url(/images/img_herb_hero.png)] bg-cover bg-bottom bg-no-repeat p-8">
        <div className="relative h-full w-full">
          {/* 遮罩層 */}
          <div className="absolute left-1/2 h-[280px] w-[90%] max-w-[700px] -translate-x-1/2 rounded-lg border border-stone-300 bg-white/40 shadow-md sm:w-[80%] md:w-[70%] lg:w-[60%]"></div>

          <div className="my-6 justify-items-center">
            <h1
              className="relative z-10 my-10 py-4 text-2xl font-semibold sm:col-span-2 lg:text-3xl"
              style={{ fontFamily: "GenRyuMin" }}
            >
              一起探索實用的中藥知識吧！
            </h1>
            <HerbSearchBar className="relative z-10 col-start-2 col-end-4 mb-4" />
            <HerbNoticeBar className="relative z-10 col-start-2 mb-2 sm:col-end-4" />
          </div>
        </div>
      </header>
      <div className="container-broad">
        <HerbSidebarDrawer className="block sm:hidden" />

        <div className="bg-land/80 flex rounded-xl p-4">
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
