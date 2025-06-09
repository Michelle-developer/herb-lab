import HerbCard from "./HerbCard";
import { useHerbContext } from "../../contexts/HerbContext";
import { useState } from "react";

function HerbCardGrid() {
  const { herbs, queryState } = useHerbContext();
  const [visibleCount, setVisibleCount] = useState(5);
  const isFiltered = queryState.keyword || queryState.category;
  const source = isFiltered ? queryState.filteredHerbs : herbs;
  const displayHerbs = source.slice(0, visibleCount);

  return (
    <>
      <ul className="mb-4 grid grid-cols-5 justify-items-center gap-2">
        <HerbCard displayHerbs={displayHerbs} />
      </ul>

      {source.length > visibleCount && (
        <button
          className="bg-grass border-grass w-full rounded-full border-solid p-2 text-stone-100"
          onClick={() => setVisibleCount((count) => count + 5)}
        >
          顯示更多藥材
        </button>
      )}
    </>
  );
}

export default HerbCardGrid;
