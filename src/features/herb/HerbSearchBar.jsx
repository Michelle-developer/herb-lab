import { useState } from "react";
import { useHerbContext } from "../../contexts/HerbContext";

function HerbSearchBar({ className }) {
  const { herbs, queryDispatch } = useHerbContext();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    queryDispatch({
      type: "searchHerbs",
      payload: { keyword: searchQuery, herbs: herbs },
    });

    setSearchQuery("");
  }

  return (
    <form
      className={`${className} bg-jade flex items-center gap-2 rounded-full px-2 text-lg md:text-xl lg:text-2xl`}
      onSubmit={handleSubmit}
    >
      <input
        className="focus:placeholder-grass flex-1 bg-transparent px-4 py-2 focus:outline-none sm:px-6 sm:py-3"
        type="text"
        placeholder="輸入中藥名，如：當歸"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button
        type="submit"
        className="hover:bg-oliver bg-grass border-grass relative flex min-w-[120px] cursor-pointer items-center rounded-full border-solid px-4 py-2 text-right text-stone-100 sm:py-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-2 size-6 stroke-stone-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        搜尋
      </button>
    </form>
  );
}

export default HerbSearchBar;
