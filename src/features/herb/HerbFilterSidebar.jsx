import HerbFilterNature from "./HerbFilterNature";
import { useHerbContext } from "../../contexts/HerbContext";

function HerbFilterSidebar() {
  const { queryDispatch } = useHerbContext();

  return (
    <aside className="bg-jade flex-1 rounded-xl p-4">
      <p className="mb-4 rounded-xl bg-stone-200 p-4 text-stone-800">
        ⚠️ 使用「分類」功能，搜尋結果將被取代，請確認資料已儲存。
      </p>
      <HerbFilterNature />

      <button
        type="button"
        className="bg-grass border-grass w-full rounded-full border-solid p-2 text-stone-100"
        onClick={() => queryDispatch({ type: "clearFilter" })}
      >
        清除分類條件
      </button>
    </aside>
  );
}

export default HerbFilterSidebar;
