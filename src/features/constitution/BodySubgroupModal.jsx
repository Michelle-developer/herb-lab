import { useConstitutionContext } from "../../contexts/ConstitutionContext";

function BodySubgroupModal({ setIsModalOpen }) {
  const { symptomState, symptomDispatch } = useConstitutionContext();
  const subgroupLabels = {
    head: "頭面部",
    "facial-features": "五官",
    chest: "胸部",
    abdomen: "腹部",
    "limbs-skin": "四肢與皮膚",
    others: "全身與綜合類", //TODO:
  };

  function handleOpenSymptoms(option) {
    setIsModalOpen(false);
    symptomDispatch({ type: "setActiveGroup", payload: option });
    console.log(option); //TODO:
  }

  return (
    <>
      <div className="fixed inset-0 top-[10%] left-[12%] z-50 h-[30%] w-[75%] rounded-lg border border-gray-800 bg-gray-50 p-4 shadow-lg sm:top-[20%] sm:left-[30%] sm:h-[35%] sm:w-[40%]">
        <div className="relative">
          <button onClick={() => setIsModalOpen(false)}>
            <span className="absolute top-[-20%] right-[0%]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-stone-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
          </button>
        </div>
        <p className="mb-6 text-center text-base font-semibold sm:mb-10 md:text-lg lg:text-xl">
          你想選哪個特定部位呢？
        </p>

        <div className="flex justify-around gap-2">
          {symptomState.selectingSubgroup.relatedOptions.map(
            (option, index) => (
              <button
                key={index}
                className="hover:bg-oliver bg-grass min-w-[100px] cursor-pointer items-center rounded-full p-2 text-center text-base text-stone-100 sm:w-1/3 sm:py-3 md:text-lg"
                value={option}
                onClick={(e) => handleOpenSymptoms(e.target.value)}
              >
                {subgroupLabels[option]}
              </button>
            ),
          )}
        </div>
      </div>
    </>
  );
}

export default BodySubgroupModal;
