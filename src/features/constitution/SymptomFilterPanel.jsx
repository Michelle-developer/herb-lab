import { SquareArrowRight } from 'lucide-react';
import { useConstitutionContext } from '../../contexts/ConstitutionContext';

function SymptomFilterPanel() {
  const { symptoms, symptomState, symptomDispatch } = useConstitutionContext();

  // (1) 點選特定症狀，對應的體質卡片顯示為高亮的功能
  function handleHighlight([value, checked]) {
    const selectedValue = value; //id(slug)
    const isChecked = checked;

    const selectedSymptom = symptoms.find((symptom) => symptom.id === selectedValue);

    const relatedConstitutions = selectedSymptom.related_constitutions;
    // Toggle: 若為點選項目則高亮，非點選項目則移除高亮
    const newSelected = isChecked ? relatedConstitutions : [];

    symptomDispatch({
      type: 'setHighlightCard',
      payload: newSelected,
    });
  }

  // (2) 儲存/ 刪除多個症狀的功能 => 用於暫存勾選狀態 + 累積體質總分
  function handleFilter([value, checked]) {
    const selectedValue = value;
    const isChecked = checked;

    const prevSelected = symptomState.selectedSymptomIds;
    // Toggle: 若為點選項目則加進去，非點選項目則移除
    const newSelected = isChecked
      ? [...prevSelected, selectedValue] // 勾選：更新成最新狀態，完整的已勾選症狀清單
      : prevSelected.filter((v) => v !== selectedValue); // 取消勾選：將取消勾選的症狀，從已勾選症狀陣列中移除

    symptomDispatch({
      type: 'symptomToggle',
      payload: {
        symptomId: selectedValue,
        newSelected: newSelected,
        isChecked: isChecked,
      },
    });
  }

  return (
    <div className="z-5 col-start-1 col-end-3 row-start-1 row-end-6 rounded-lg border-y border-gray-600 bg-white/50 p-2">
      {/* (3) 條件判斷切換UI：已選身體部位的相關症狀清單 or 互動說明 */}
      {symptomState.activeGroup ? (
        <div className="bg-land/70 border-land z-10 ml-30 min-w-[200px] overflow-hidden rounded-lg border p-2 transition-all duration-300 ease-in-out">
          <legend className="col-span-2 row-span-2 my-2 text-center font-semibold">
            {symptomState.activeGroup.toUpperCase()}
          </legend>
          <div className="divide-y-1 divide-dotted divide-gray-100">
            {symptomState.activeGroup &&
              symptoms
                .filter((symptom) => symptomState.activeGroup === symptom.group_slug)
                .map((symptom) => (
                  <div
                    key={symptom.id}
                    className="m-1 space-x-1 p-1 text-sm md:text-base lg:text-lg"
                  >
                    <input
                      type="checkbox"
                      id={symptom.id}
                      name={symptom.activeGroup}
                      value={symptom.id}
                      checked={symptomState.selectedSymptomIds.includes(`${symptom.id}`)}
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
              onClick={() => symptomDispatch({ type: 'backToMain' })}
            >
              送出/ 回主畫面
            </button>
            <button
              className="text-grass my-2 w-full cursor-pointer items-center rounded-full bg-stone-100 p-2 text-center text-sm hover:bg-stone-200"
              onClick={() => symptomDispatch({ type: 'clearCurrentGroup' })}
            >
              清空此部位
            </button>
          </div>
        </div>
      ) : (
        <div className="md:text-md flex w-25 flex-col text-justify text-base tracking-tighter text-gray-900 sm:w-45 sm:p-4 md:w-62 lg:text-lg">
          <h2 className="my-1 flex items-center justify-center gap-2 font-semibold md:my-4">
            點擊中央人物
            <SquareArrowRight className="text-stone-500" strokeWidth={1} />
          </h2>
          <ul className="lg:text-md space-y-2 text-sm md:text-base">
            <li className="text-oliver font-semibold">來猜猜各部位症狀命中的體質！</li>
            <li className="font-light text-stone-600">詳細說明請按左下角小人按鈕。</li>
          </ul>
          <img
            src="/images/img_waiter.webp"
            title="咖啡廳的男店員"
            alt="穿著深綠色圍裙，帶著開朗笑容的咖啡廳男店員，舉起左手做出引導的姿勢"
            className="object-fit hidden w-60 self-center object-top sm:block"
          />
        </div>
      )}
    </div>
  );
}

export default SymptomFilterPanel;
