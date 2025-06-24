import { useConstitutionContext } from "../../contexts/ConstitutionContext";

function SymptomFilterPanel() {
  const { symptoms, symptomState, symptomDispatch } = useConstitutionContext();

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
    <div className="z-5 col-start-1 col-end-3 row-start-1 row-end-6 rounded-lg border-y border-gray-600 bg-white/50 p-2">
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
                  (symptom) => symptomState.activeGroup === symptom.group_slug,
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
              className="hover:bg-oliver bg-grass my-2 mb-2 w-full cursor-pointer items-center rounded-full p-2 text-center text-sm text-stone-100"
              onClick={() => symptomDispatch({ type: "backToMain" })}
            >
              送出/ 回主畫面
            </button>
            <button
              className="text-grass my-2 w-full cursor-pointer items-center rounded-full bg-stone-100 p-2 text-center text-sm hover:bg-stone-200"
              onClick={() => symptomDispatch({ type: "clearCurrentGroup" })}
            >
              清空此部位
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-25 flex-col text-justify text-base leading-6 text-gray-900 sm:w-45 sm:p-4 md:w-80 md:text-lg md:leading-10 lg:text-xl">
          <p>點擊中間人物的身體部位 👉</p>
          <p className="hidden md:block">
            可查看各部位關聯症狀。來猜猜看各症狀命中的體質吧！
          </p>
          <img
            src="/images/img_waiter.png"
            className="object-fit hidden w-60 self-center object-top sm:block"
          />
        </div>
      )}
    </div>
  );
}

export default SymptomFilterPanel;
