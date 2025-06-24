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
    <div className="pt-[88px]">
      <header className="h-screen min-h-[100vh] w-screen bg-[url(/images/img_herb_hero.png)] bg-cover bg-bottom bg-no-repeat p-8">
        <div className="my-6 justify-items-center">
          <h1 className="relative z-10 mt-10 mb-20 py-4 text-xl font-semibold sm:col-span-2 md:text-2xl lg:text-3xl">
            一起探索實用的中藥知識吧！
          </h1>
          <HerbSearchBar className="relative z-10 col-start-2 col-end-4" />
          <HerbNoticeBar className="relative z-10 hidden sm:col-start-2 sm:col-end-4 sm:inline" />
        </div>
      </header>
      <div className="container-broad">
        <HerbSidebarDrawer className="block sm:hidden" />

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
