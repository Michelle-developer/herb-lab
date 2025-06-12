import HerbCard from "./HerbCard";
import HerbCardItem from "./HerbCardItem";

import { useHerbContext } from "../../contexts/HerbContext";
import { useState } from "react";

function HerbCardGrid() {
  const { queryState } = useHerbContext();
  const [visibleCount, setVisibleCount] = useState(5);
  const isFiltered = queryState.displayMode === "result";
  const source = isFiltered ? queryState.filteredHerbs : queryState.rawHerbs;
  const displayHerbs = source.slice(0, visibleCount);

  //顯示模式開關（進階模組）
  // {
  //   queryState.displayMode === "default" && <DefaultHerbList herbs={rawHerbs} />;
  // }
  // {
  //   queryState.displayMode === "result" && <FilteredHerbList herbs={filteredHerbs} />;
  // }
  // {
  //   queryState.displayMode === "no-result" && <NoResultMessage />;
  // }

  return (
    <>
      <ul className="mb-2 grid grid-cols-3 justify-items-center gap-2 lg:grid-cols-5">
        {(queryState.activeCategory === "all" ||
          queryState.displayMode === "default") &&
          displayHerbs.map((herb) => (
            <HerbCardItem herb={herb} key={herb.id} />
          ))}

        {queryState.displayMode === "result" && (
          <HerbCard displayHerbs={displayHerbs} />
        )}

        {queryState.displayMode === "no-result" && (
          <p className="col-span-5 my-4">我們找不到你查詢的中藥 🥲</p>
        )}
      </ul>

      {source.length > visibleCount && (
        <button
          className="bg-grass border-grass hover:bg-oliver my-4 w-full cursor-pointer rounded-full border-solid p-2 text-stone-100"
          onClick={() => setVisibleCount((count) => count + 5)}
        >
          顯示更多藥材
        </button>
      )}
    </>
  );
}

export default HerbCardGrid;
