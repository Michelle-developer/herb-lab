import { Link } from "react-router-dom";
import { useConstitutionContext } from "../../contexts/ConstitutionContext";
import BodySubgroupModal from "./BodySubgroupModal";
import { useState } from "react";

function ConstitutionListSymptoms({ constitutions }) {
  const { symptoms, symptomState, symptomDispatch } = useConstitutionContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal(value) {
    setIsModalOpen(true);
    symptomDispatch({ type: "setSubgroup", payload: value });
    console.log(value); //TODO:
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="relative">
      {/* 遮罩層 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          onClick={handleCloseModal}
        />
      )}
      <div className="mx-4 my-6 grid grid-cols-[1fr_1fr_1.5fr_1.5fr_1fr_1fr] place-items-center gap-2">
        {/* 症狀標籤區 */}
        <div className="col-start-1 col-end-3 rounded-lg border-y border-gray-600 p-2">
          {/* 互動說明/標籤切換 */}
          {symptomState.activeGroup ? (
            <div className="bg-jade z-10 min-w-[150px] overflow-hidden rounded-lg pl-2 transition-all duration-300 ease-in-out">
              <legend className="col-span-2 row-span-2 my-2 text-center font-semibold">
                {symptomState.activeGroup.toUpperCase()}
              </legend>
              {/* 互動說明/標籤切換 TODO:待改成動態參數*/}
              <div className="divide-y-1 divide-dotted divide-gray-300">
                {symptomState.activeGroup === "head" &&
                  symptoms
                    .filter((symptom) => symptom.group_slug === "head")
                    .map((headSymptom) => (
                      <div
                        key={headSymptom.id}
                        className="m-1 space-x-1 p-0.5 text-sm md:text-base lg:text-lg"
                      >
                        <input
                          type="checkbox"
                          id={headSymptom.id}
                          name="head"
                          value={headSymptom.id}
                          onChange={() =>
                            symptomDispatch({
                              type: "symptomToggle",
                              payload: headSymptom.id,
                            })
                          }
                        />
                        <label htmlFor={headSymptom.id}>
                          {headSymptom.label}
                        </label>
                      </div>
                    ))}
                <button className="hover:bg-oliver bg-grass my-2 w-full cursor-pointer items-center rounded-full p-2 text-center text-sm text-stone-100">
                  換部位
                </button>
              </div>
            </div>
          ) : (
            <div className="min-w-[96px]">
              <p>請點人物身體部位查看症狀👉</p>
            </div>
          )}
        </div>

        {/* 人物圖本體 */}
        <div className="relative col-start-3 col-end-5 row-span-10 aspect-[1/2] w-[min(100%,360px)]">
          <img
            src="../src/assets/images/show_girl_5.png"
            className="h-full w-full object-cover"
          />

          {/* 點擊區塊：頭面部、五官 */}
          <div
            role="button"
            tabIndex={0}
            className="absolute top-[0%] left-[10%] h-[22%] w-[75%] cursor-pointer bg-gray-200/80"
            aria-label="點擊頭部"
            onClick={() => handleOpenModal("head")}
          ></div>

          {/* 部位子選單 */}
          {isModalOpen && <BodySubgroupModal setIsModalOpen={setIsModalOpen} />}

          {/* 點擊區塊：胸部、四肢 */}
          <button
            className="absolute top-[22%] left-[10%] h-[15%] w-[75%] bg-orange-200/80"
            aria-label="點擊胸部"
          ></button>

          {/* 點擊區塊：腹部、四肢 */}
          <button
            className="absolute top-[37%] left-[10%] h-[20%] w-[75%] bg-red-200/80"
            aria-label="點擊腹部"
          ></button>

          {/* 點擊區塊：四肢 */}
          <button
            className="absolute top-[57%] left-[10%] h-[45%] w-[75%] bg-green-200/80"
            aria-label="點擊下肢"
          ></button>
        </div>

        {/* 三大體質卡片 */}
        <div className="col-start-5 col-end-7 row-span-10">
          <ul className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
            {constitutions.map((constitution) => (
              <li
                className="items-center justify-center rounded-lg border border-stone-200 bg-stone-50 px-1 py-2"
                key={constitution.id}
              >
                <Link to={`/constitutions/${constitution.slug}`}>
                  <h5 className="mb-2 text-center text-sm font-semibold md:text-base lg:text-lg">
                    {constitution.name}
                  </h5>

                  <img
                    src={`../../src/${constitution.img}`}
                    alt={constitution.name}
                    className="aspect-square w-15 rounded-full border-4 border-gray-500 object-cover object-top"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ConstitutionListSymptoms;
