import { useHerbContext } from "../../contexts/HerbContext";
import HerbFilterNature from "./HerbFilterNature";
import HerbFilterTaste from "./HerbFilterTaste";

function HerbFilterSidebar() {
  const { queryDispatch } = useHerbContext();

  return (
    <aside className="bg-jade hidden rounded-xl p-4 sm:block sm:w-1/3 sm:flex-shrink-0 sm:flex-grow md:max-w-[280px] md:min-w-[200px]">
      <p className="mb-4 rounded-xl bg-stone-200 p-4 text-stone-800">
        ⚠️ 使用「分類」功能，搜尋結果將被取代，請確認資料已儲存。
      </p>
      <div className="flex justify-around">
        <HerbFilterNature />
        <HerbFilterTaste />
      </div>

      <button
        type="button"
        className="bg-grass border-grass hover:bg-oliver w-full cursor-pointer rounded-full border-solid p-2 text-stone-100"
        onClick={() => queryDispatch({ type: "clearFilter" })}
      >
        清除分類條件
      </button>
    </aside>
  );
}

export default HerbFilterSidebar;
