import HerbSearchBar from "./HerbSearchBar";
import HerbNoticeBar from "./HerbNoticeBar";
import HerbFilterSidebar from "./HerbFilterSidebar";
import HerbCardGrid from "./HerbCardGrid";
import HerbSidebarDrawer from "./HerbSidebarDrawer";

function HerbList() {
  return (
    <div className="container-broad">
      <header className="my-6 justify-items-center gap-4 sm:grid sm:grid-cols-3">
        <img
          className="hidden sm:row-span-3 sm:inline-block sm:w-60"
          src="../src/assets/images/Humaaans-sitting.png"
        />
        <h1 className="my-8 text-xl font-semibold sm:col-span-2 md:pl-8 md:text-2xl lg:text-3xl">
          一起探索實用的中藥知識吧！
        </h1>
        <HerbSearchBar className="col-start-2 col-end-4" />
        <HerbNoticeBar className="hidden sm:col-start-2 sm:col-end-4 sm:inline" />
      </header>
      <div className="mx-2 mb-4 flex justify-between">
        <div className="border-l-6 border-stone-200 px-4 py-3 text-center text-sm text-stone-600 md:text-base">
          你選的類別：
          <span className="rounded-full bg-stone-100 px-3 py-1">藥性</span>
        </div>
        <HerbSidebarDrawer className="block sm:hidden" />
      </div>

      <div className="bg-land flex rounded-xl p-4">
        <HerbFilterSidebar />

        <main className="m-2 w-full sm:w-200 sm:flex-auto">
          <HerbCardGrid />
        </main>
      </div>
    </div>
  );
}

export default HerbList;
