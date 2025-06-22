"use client";

import ReusableDrawer from "../../components/ReusableDrawer";
import { useHerbContext } from "../../contexts/HerbContext";
import HerbFilterNature from "./HerbFilterNature";
import HerbFilterTaste from "./HerbFilterTaste";
import HerbCategorySelector from "./HerbCategorySelector";
import { FunnelPlus } from "lucide-react";

function HerbSidebarDrawer() {
  const { queryState } = useHerbContext();

  return (
    <ReusableDrawer
      title="中藥分類條件"
      trigger={
        <button className="ring-land flex w-24 cursor-pointer justify-around rounded-full bg-gray-950/5 px-4 py-1.5 text-right text-lg font-semibold text-stone-600 hover:bg-gray-950/10 focus:ring-2 focus:outline-none">
          <FunnelPlus />
          篩選
        </button>
      }
      className="bg-[url(/images/img_drawer.png)] bg-cover bg-center"
    >
      <HerbCategorySelector />
      {queryState.activeCategory === "all" && <p>無預設分類</p>}
      {queryState.activeCategory === "nature" && <HerbFilterNature />}
      {queryState.activeCategory === "taste" && <HerbFilterTaste />}
    </ReusableDrawer>
  );
}

export default HerbSidebarDrawer;
