import HerbCard from "./HerbCard";

function HerbCardGrid() {
  return (
    <>
      <ul className="mb-4 grid grid-cols-5 justify-items-center gap-2">
        <HerbCard />
      </ul>
      <button className="bg-grass border-grass w-full rounded-full border-solid p-2 text-stone-100">
        顯示更多藥材
      </button>
    </>
  );
}

export default HerbCardGrid;
