import HerbCard from "./HerbCard";
import HerbCardItem from "./HerbCardItem";

import { useHerbContext } from "../../contexts/HerbContext";
import { useState } from "react";

function HerbCardGrid() {
  const { queryState } = useHerbContext();
  const [visibleCount, setVisibleCount] = useState(10);
  const isFiltered = queryState.displayMode === "result";
  const source = isFiltered ? queryState.filteredHerbs : queryState.rawHerbs;
  const displayHerbs = source.slice(0, visibleCount);

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
          <div className="col-span-5 my-4 w-[30%]">
            <img src="/images/img_error.png" />
            <p>我們找不到你查詢的中藥 🥲</p>
          </div>
        )}
      </ul>

      {source.length > visibleCount && queryState.displayMode == "result" && (
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
