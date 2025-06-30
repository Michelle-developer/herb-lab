import { useState } from "react";
import { useHerbContext } from "../../contexts/HerbContext";
import { Search } from "lucide-react";

function HerbSearchBar({ className }) {
  const { queryDispatch } = useHerbContext();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    queryDispatch({
      type: "searchHerbs",
      payload: { keyword: searchQuery },
    });

    setSearchQuery("");
  }

  return (
    <form
      className={`${className} bg-jade mx-auto flex w-full max-w-[90%] items-center gap-2 rounded-full px-2 text-lg md:max-w-[50%] md:text-xl`}
      onSubmit={handleSubmit}
    >
      <input
        className="focus:placeholder-grass min-w-0 flex-1 flex-grow bg-transparent px-4 py-2 focus:outline-none sm:px-6 sm:py-3"
        type="text"
        placeholder="輸入中藥名"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button
        type="submit"
        className="hover:bg-oliver bg-grass border-grass relative flex w-[100px] cursor-pointer items-center justify-around rounded-full border-solid px-4 py-2 text-right text-stone-100 sm:w-[110px] sm:py-3"
        style={{ fontFamily: "GenRyuMin" }}
      >
        <Search />
        <p>搜尋</p>
      </button>
    </form>
  );
}

export default HerbSearchBar;
