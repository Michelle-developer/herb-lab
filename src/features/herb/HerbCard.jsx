import HerbCardItem from "./HerbCardItem";

//TODO:加到處看看button功能
function HerbCard({ displayHerbs }) {
  return (
    <>
      {displayHerbs.length === 0 ? (
        <>
          <p className="col-span-5">抱歉，我們找不到你查詢的中藥 🥲</p>
          {/* <button
            className="bg-grass border-grass w-full rounded-full border-solid p-2 text-stone-100"
            onClick={() => setVisibleCount(5)}
          >
            到處看看
          </button> */}
        </>
      ) : (
        displayHerbs.map((herb) => <HerbCardItem herb={herb} key={herb.id} />)
      )}
    </>
  );
}

export default HerbCard;
