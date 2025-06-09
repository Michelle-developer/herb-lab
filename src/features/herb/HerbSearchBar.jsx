import { useState } from "react";
import { useHerbContext } from "../../contexts/HerbContext";

function HerbSearchBar() {
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
      className="bg-jade col-start-2 col-end-4 rounded-full text-lg md:text-xl lg:text-2xl"
      onSubmit={handleSubmit}
    >
      <input
        className="focus:placeholder-grass w-60 p-2 focus:outline-none md:w-80"
        type="text"
        placeholder="輸入中藥名，如：當歸"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-grass border-grass rounded-full border-solid p-4 text-stone-100"
      >
        開始搜尋
      </button>
    </form>
  );
}

export default HerbSearchBar;
