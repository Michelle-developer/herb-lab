import { Link } from "react-router-dom";
import { useConstitutionContext } from "../../contexts/ConstitutionContext";
import { useState } from "react";
import BodySubgroupModal from "./BodySubgroupModal";
import Toast from "../../components/Toast";
import ConstitutionCounterDrawer from "./ConstitutionCounterDrawer";
import { BrushCleaning } from "lucide-react";

function ConstitutionListSymptoms({ constitutions }) {
  const { symptoms, symptomState, symptomDispatch } = useConstitutionContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal(value) {
    setIsModalOpen(true);
    symptomDispatch({ type: "setSubgroup", payload: value });
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  // 症狀對應的體質卡片高亮功能
  function handleHighlight([value, checked]) {
    const selectedValue = value; //id(slug)
    const isChecked = checked;

    const selectedSymptom = symptoms.find(
      (symptom) => symptom.id === selectedValue,
    );

    const relatedConstitutions = selectedSymptom.related_constitutions;
    // Toggle: 若為點選項目則高亮，非點選項目則移除高亮
    const newSelected = isChecked ? relatedConstitutions : [];

    symptomDispatch({
      type: "setHighlightCard",
      payload: newSelected,
    });
  }

  // 症狀標籤chekbox多選功能
  function handleFilter([value, checked]) {
    const selectedValue = value;
    const isChecked = checked;

    const prevSelected = symptomState.selectedSymptomIds;
    // Toggle: 若為點選項目則加進去，非點選項目則移除
    const newSelected = isChecked
      ? [...prevSelected, selectedValue] //更新成最新狀態的完整清單
      : prevSelected.filter((v) => v !== selectedValue);

    symptomDispatch({
      type: "symptomToggle",
      payload: {
        symptomId: selectedValue,
        newSelected: newSelected,
        isChecked: isChecked,
      },
    });

    console.log(
      "體質頁送出:",
      "isChecked",
      isChecked,
      "selectedValue",
      selectedValue,
      "prevSelected",
      prevSelected,
      "newSelected",
      newSelected,
    );
    console.log(
      "體質頁接收:",
      "totalSelectedSymptomIds",
      symptomState.totalSelectedSymptomIds,
    ); //TODO:
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

      {/* 提示訊息 TODO:*/}
      {symptomState.displayMessage.type && (
        <Toast type={symptomState.displayMessage.type} />
      )}

      <div className="mx-4 my-6 grid grid-cols-[1fr_1fr_1.5fr_1.5fr_1fr_1fr] place-items-center gap-2">
        {/* 症狀標籤區 */}
        <div className="z-5 col-start-1 col-end-3 rounded-lg border-y border-gray-600 bg-white/50 p-2">
          {/* 互動說明/標籤切換 */}
          {symptomState.activeGroup ? (
            <div className="bg-land/70 border-land z-10 ml-30 min-w-[200px] overflow-hidden rounded-lg border p-2 transition-all duration-300 ease-in-out">
              <legend className="col-span-2 row-span-2 my-2 text-center font-semibold">
                {symptomState.activeGroup.toUpperCase()}
              </legend>
              <div className="divide-y-1 divide-dotted divide-gray-100">
                {symptomState.activeGroup &&
                  symptoms
                    .filter(
                      (symptom) =>
                        symptomState.activeGroup === symptom.group_slug,
                    )
                    .map((symptom) => (
                      <div
                        key={symptom.id}
                        className="m-1 space-x-1 p-1 text-sm md:text-base lg:text-lg"
                      >
                        {/* 症狀標籤：點選特定症狀，對應體質卡片高亮 */}
                        <input
                          type="checkbox"
                          id={symptom.id}
                          name={symptom.activeGroup}
                          value={symptom.id}
                          checked={symptomState.selectedSymptomIds.includes(
                            `${symptom.id}`,
                          )}
                          onChange={(e) => {
                            handleHighlight([e.target.value, e.target.checked]);
                            handleFilter([e.target.value, e.target.checked]);
                          }}
                        />

                        <label htmlFor={symptom.id}>{symptom.label}</label>
                      </div>
                    ))}
                <button
                  className="hover:bg-oliver bg-grass my-2 w-full cursor-pointer items-center rounded-full p-2 text-center text-sm text-stone-100"
                  onClick={() => symptomDispatch({ type: "clearActiveGroup" })}
                >
                  換部位
                </button>
              </div>
            </div>
          ) : (
            <div className="tetx-gray-600 min-w-[96px]">
              請點選人物身體部位 👉
            </div>
          )}
        </div>

        {/* 人物圖本體 */}
        <div className="relative col-start-3 col-end-5 row-span-10 aspect-[1/2] w-[min(100%,360px)]">
          <img
            src="/images/show_girl_5.png"
            className="h-full w-full object-cover"
          />

          {/* 點擊區塊：頭面部、五官 TODO:bg-transparent*/}
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
            onClick={() => handleOpenModal("chest")}
          ></button>

          {/* 點擊區塊：腹部、四肢 */}
          <button
            className="absolute top-[37%] left-[10%] h-[20%] w-[75%] bg-red-200/80"
            aria-label="點擊腹部"
            onClick={() => handleOpenModal("abdomen")}
          ></button>

          {/* 點擊區塊：四肢 */}
          <button
            className="absolute top-[57%] left-[10%] h-[45%] w-[75%] bg-green-200/80"
            aria-label="點擊下肢"
            onClick={() => handleOpenModal("limbs-skin")}
          ></button>
        </div>

        {/* 三大體質卡片 */}
        <div className="col-start-5 col-end-7 row-span-10">
          <ul className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
            {constitutions.map((constitution) => (
              <li
                className={`items-center justify-center rounded-lg border border-stone-200 bg-stone-50 px-1 py-2 ${
                  symptomState.highlightedConstitutionSlugs.includes(
                    constitution.slug,
                  )
                    ? "shadow-2xl shadow-yellow-400"
                    : ""
                }`}
                key={constitution.id}
              >
                <Link to={`/constitutions/${constitution.slug}`}>
                  <h5 className="mb-2 text-center text-sm font-semibold md:text-base lg:text-lg">
                    {constitution.name}
                  </h5>

                  <img
                    src={`${constitution.img}`}
                    alt={constitution.name}
                    className="aspect-square w-15 rounded-full border-4 border-gray-500 object-cover object-top"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 體質總分統計區 */}
        <div className="col-span-2 flex justify-center gap-0.5">
          <ConstitutionCounterDrawer
            onClick={() =>
              symptomDispatch({
                type: "setTotalConstitutionCount",
                payload: symptoms,
              })
            }
          />

          {/* 清除總分計算按鈕 */}
          <button className="ring-land h-12 w-12 cursor-pointer rounded-full bg-gray-950/5 px-3 py-2 text-lg font-semibold text-stone-600 hover:bg-gray-950/10 focus:ring-2 focus:outline-none">
            <BrushCleaning className="text-grass" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConstitutionListSymptoms;
