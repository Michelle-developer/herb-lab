import { Link } from "react-router-dom";

//TODO:抽HerbCardItem
function HerbCard({ displayHerbs }) {
  return (
    <>
      {displayHerbs.length === 0 ? (
        <p className="col-span-5">抱歉，我們找不到你查詢的中藥 🥲</p>
      ) : (
        displayHerbs.map((herb) => (
          <li
            key={herb.id}
            className="flex flex-col items-center rounded-lg bg-stone-200 p-4"
          >
            <img src={`../../src/${herb.img}`} className="w-28 rounded-lg" />
            <Link to={`/herbs/${herb.slug}`}>
              <h4 className="text-sm font-semibold md:text-base lg:text-lg">
                {herb.name_zh}
              </h4>
            </Link>
            <p className="text-xs md:text-sm lg:text-base">
              {herb.function_group}
            </p>
          </li>
        ))
      )}
    </>
  );
}

export default HerbCard;
