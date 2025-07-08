import { useConstitutionContext } from '../../contexts/useConstitutionContext';
import { useState } from 'react';
import Toast from '../../components/Toast';
import ConstitutionCounterDrawer from './ConstitutionCounterDrawer';
import { BrushCleaning } from 'lucide-react';
import SymptomFilterPanel from './SymptomFilterPanel';
import BodyClickableMap from './BodyClickableMap';
import ConstitutionCard from './ConstitutionCard';

function ConstitutionListSymptoms() {
  const { constitutions, symptoms, symptomState, symptomDispatch } = useConstitutionContext();
  // 控制身體部位Modal的開關
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="relative">
      {/* 遮罩層：點擊人形圖 => 選身體部位Modal開啟時出現 */}
      {isModalOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          tabIndex={-1}
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          onClick={handleCloseModal}
        />
      )}

      {/* (1) Toast：體質互動操作過程中的提示簡訊 */}
      {symptomState.displayMessage.type && <Toast type={symptomState.displayMessage.type} />}

      <div className="mx-4 grid grid-cols-6 grid-rows-6 place-items-center gap-2 sm:h-[110vh] md:place-items-start">
        {/* (2) 症狀清單模組 */}
        <SymptomFilterPanel />

        {/* (3) 人物圖本體 */}
        <BodyClickableMap
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          symptomDispatch={symptomDispatch}
        />

        {/* (4) 三大體質卡片 */}
        <ConstitutionCard constitutions={constitutions} symptomState={symptomState} />

        <div className="col-start-1 col-end-3 row-start-5 row-end-6 flex w-auto items-center justify-center gap-1">
          {/* (5) 體質總分按鈕（觸發drawer）  */}
          <ConstitutionCounterDrawer
            onClick={() =>
              symptomDispatch({
                type: 'setTotalConstitutionCount',
                payload: symptoms,
              })
            }
          />

          {/* (6) 清除總分計算按鈕 */}
          <button className="ring-land flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-200/50 text-lg font-semibold hover:bg-gray-950/10 focus:ring-2 focus:outline-none sm:h-16 sm:w-16 sm:px-4 sm:py-2">
            <BrushCleaning
              className="text-grass h-6 w-6 sm:h-10 sm:w-10"
              onClick={() => symptomDispatch({ type: 'clearAll' })}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConstitutionListSymptoms;
