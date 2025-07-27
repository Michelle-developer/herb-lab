import PropTypes from 'prop-types';
import { useConstitutionContext } from '../../contexts/useConstitutionContext';
import { SquareX } from 'lucide-react';

function BodySubgroupModal({ setIsModalOpen }) {
  const { symptomState, symptomDispatch } = useConstitutionContext();
  // Slug和UI按鈕文字的對照表
  const subgroupLabels = {
    head: '頭面部',
    'facial-features': '五官',
    chest: '胸部',
    abdomen: '腹部',
    'limbs-skin': '四肢與皮膚',
    others: '全身與綜合類',
  };

  function handleOpenSymptoms(option) {
    setIsModalOpen(false);
    symptomDispatch({ type: 'setActiveGroup', payload: option });
  }

  return (
    <>
      <div className="fixed inset-0 top-[10%] left-[12%] z-50 h-[30%] w-[75%] rounded-lg border border-gray-800 bg-gray-50 p-4 shadow-lg sm:top-[20%] sm:left-[30%] sm:h-[35%] sm:w-[40%]">
        <div className="relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-0 right-0 cursor-pointer"
          >
            <SquareX className="text-stone-400" />
          </button>
        </div>
        <p className="my-6 text-center text-base font-semibold sm:mb-10 md:text-lg lg:text-xl">
          你想選哪個特定部位呢？
        </p>

        <div className="flex justify-around gap-2">
          {symptomState.selectingSubgroup.relatedOptions.map((option, index) => (
            <button
              key={index}
              className="hover:bg-oliver bg-grass min-w-[100px] cursor-pointer items-center rounded-full p-2 text-center text-base text-stone-100 sm:w-1/3 sm:py-3 md:text-lg"
              value={option}
              onClick={(e) => handleOpenSymptoms(e.target.value)}
            >
              {subgroupLabels[option]}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

BodySubgroupModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};

export default BodySubgroupModal;
