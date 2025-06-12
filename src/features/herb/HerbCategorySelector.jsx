import { useHerbContext } from "../../contexts/HerbContext";

function HerbCategorySelector() {
  const { queryState, queryDispatch } = useHerbContext();
  return (
    <select
      name="category"
      id="herb-category"
      className="mb-6 block w-full rounded-lg border border-stone-800 bg-stone-200 py-2 text-center text-stone-800"
      value={queryState.activeCategory}
      onChange={(e) =>
        queryDispatch({ type: "setActiveCategory", payload: e.target.value })
      }
    >
      <option value="" disabled>
        &#9882; 選擇分類 &#9882;
      </option>
      <option value="all">自由探索</option>
      <option value="nature">藥性</option>
      <option value="taste">藥味</option>
    </select>
  );
}

export default HerbCategorySelector;
