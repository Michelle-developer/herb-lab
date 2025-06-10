import HerbSearchBar from "./HerbSearchBar";
import HerbNoticeBar from "./HerbNoticeBar";
import HerbFilterSidebar from "./HerbFilterSidebar";
import HerbCardGrid from "./HerbCardGrid";
import HerbSidebarDrawer from "./HerbSidebarDrawer";

//TODO: drawer加上className md:hidden
function HerbList() {
  return (
    <div>
      <header className="my-6 grid grid-cols-3 justify-items-center gap-4">
        <img
          className="row-span-3 w-60"
          src="../src/assets/images/Humaaans-sitting.png"
        />
        <h1 className="col-span-2 my-8 text-xl font-semibold md:pl-8 md:text-2xl lg:text-3xl">
          一起探索實用的中藥知識吧！
        </h1>
        <HerbSearchBar />
        <HerbNoticeBar />
        <HerbSidebarDrawer className="block" />
      </header>

      <div className="bg-land flex rounded-xl p-4">
        <HerbFilterSidebar />

        <main className="m-2 w-200 sm:flex-initial">
          <HerbCardGrid />
        </main>
      </div>
    </div>
  );
}

export default HerbList;
