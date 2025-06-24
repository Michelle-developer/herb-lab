import { useConstitutionContext } from "../../contexts/ConstitutionContext";
import { useState } from "react";
import Toast from "../../components/Toast";
import ConstitutionCounterDrawer from "./ConstitutionCounterDrawer";
import { BrushCleaning } from "lucide-react";
import SymptomFilterPanel from "./SymptomFilterPanel";
import BodyClickableMap from "./BodyClickableMap";
import ConstitutionCard from "./ConstitutionCard";

function ConstitutionListSymptoms({ constitutions }) {
  const { symptoms, symptomState, symptomDispatch } = useConstitutionContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      {/* 提示訊息 */}
      {symptomState.displayMessage.type && (
        <Toast type={symptomState.displayMessage.type} />
      )}

      <div className="mx-4 my-6 grid h-[110vh] grid-cols-6 grid-rows-6 place-items-center gap-2 md:place-items-start">
        {/* 症狀標籤區 */}
        <SymptomFilterPanel />

        {/* 人物圖本體 */}
        <BodyClickableMap
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          symptomDispatch={symptomDispatch}
        />

        {/* 三大體質卡片 */}
        <ConstitutionCard
          constitutions={constitutions}
          symptomState={symptomState}
        />

        <div className="col-start-1 col-end-3 row-start-6 row-end-7 flex w-full justify-center gap-1 sm:justify-around sm:gap-2">
          {/* 體質總分按鈕（觸發drawer）  */}
          <ConstitutionCounterDrawer
            onClick={() =>
              symptomDispatch({
                type: "setTotalConstitutionCount",
                payload: symptoms,
              })
            }
          />

          {/* 清除總分計算按鈕 */}
          <button className="ring-land flex h-12 w-12 cursor-pointer place-items-center rounded-full bg-gray-200/50 px-3 py-2 text-lg font-semibold hover:bg-gray-950/10 focus:ring-2 focus:outline-none sm:h-24 sm:w-24 sm:px-6 sm:py-3">
            <BrushCleaning
              className="text-grass h-6 w-6 sm:h-12 sm:w-12"
              onClick={() => symptomDispatch({ type: "clearAll" })}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConstitutionListSymptoms;
