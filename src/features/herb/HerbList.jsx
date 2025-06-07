import { useState } from "react";
import { useHerbContext } from "../../contexts/HerbContext";
import { Link } from "react-router-dom";

//filterMode, searchQuery, selectedCategory
function HerbList() {
  const { herbs, queryDispatch } = useHerbContext();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    queryDispatch({ type: "setKeyword", payload: searchQuery });

    console.log(searchQuery); //TODO:記得刪除

    setSearchQuery("");
  }

  return (
    <div>
      <header className="my-6 grid grid-cols-3 justify-items-center gap-4">
        <img
          className="row-span-3 w-60"
          src="../src/assets/images/Humaaans-sitting.png"
        />
        <h1 className="col-span-2 my-8 text-xl font-semibold md:pl-8 md:text-2xl lg:text-3xl">
          一起探索實用的中藥知識吧！
        </h1>
        <form
          className="bg-jade col-start-2 col-end-4 rounded-full text-lg md:text-xl lg:text-2xl"
          onSubmit={handleSubmit}
        >
          <input
            className="focus:placeholder-grass w-60 p-2 focus:outline-none md:w-80"
            type="text"
            placeholder="輸入中藥名，如：枸杞"
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
      </header>

      <div className="bg-land flex rounded-xl p-4">
        <aside className="bg-jade flex-1 rounded-xl">
          <form>
            <legend className="text-stone-600">-- 藥性分類 --</legend>
            <input type="radio" id="cold" name="herb_nature" value="cold" />
            <label>寒性</label>
            <br />
            <input type="radio" id="hot" name="herb_nature" value="hot" />
            <label>熱性</label>
            <br />
            <input type="radio" id="warm" name="herb_nature" value="warm" />
            <label>溫性</label>
            <br />
            <input type="radio" id="cool" name="herb_nature" value="cool" />
            <label>涼性</label>
            <br />
            <input
              type="radio"
              id="neutral"
              name="herb_nature"
              value="netural"
            />
            <label>平性</label>
            <br />
          </form>
        </aside>
        <main className="w-200 sm:flex-initial">
          <ul className="grid grid-cols-5 justify-items-center gap-2">
            {herbs.map((herb) => (
              <li
                key={herb.id}
                className="flex flex-col items-center rounded-lg bg-stone-200 p-4"
              >
                <img
                  src={`../../src/${herb.img}`}
                  className="w-28 rounded-lg"
                />
                <Link to={`/herbs/${herb.slug}`}>
                  <h4 className="text-sm font-semibold md:text-base lg:text-lg">
                    {herb.name_zh}
                  </h4>
                </Link>
                <p className="text-xs md:text-sm lg:text-base">
                  {herb.function_group}
                </p>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default HerbList;
