import PropTypes from 'prop-types';
import BodySubgroupModal from './BodySubgroupModal';

function BodyClickableMap({ isModalOpen, setIsModalOpen, symptomDispatch }) {
  function handleOpenModal(value) {
    setIsModalOpen(true);
    symptomDispatch({ type: 'setSubgroup', payload: value });
  }

  return (
    <div className="relative col-start-3 col-end-5 row-start-1 row-end-7 aspect-[1/2] w-[min(100%,300px)]">
      <img
        src="/images/img_show-girl.png"
        title="可點擊身體部位的古典女性"
        alt="穿著蒂芬妮藍的改良式旗袍，站姿端莊大方的女性，作為展示人體的角色"
        className="h-full w-full max-w-[360px] object-cover"
      />

      {/* 點擊區塊：頭部*/}
      <button
        className="absolute top-[0%] left-[10%] h-[22%] w-[75%] cursor-pointer bg-transparent"
        aria-label="點擊頭部"
        title="點擊頭部"
        onClick={() => handleOpenModal('head')}
      ></button>

      {/* 部位選單Modal：動態顯示子部位按鈕 */}
      {isModalOpen && <BodySubgroupModal setIsModalOpen={setIsModalOpen} />}

      {/* 點擊區塊：胸部、四肢 */}
      <button
        className="absolute top-[22%] left-[10%] h-[15%] w-[75%] cursor-pointer bg-transparent"
        aria-label="點擊胸部、四肢"
        title="點擊胸部、四肢"
        onClick={() => handleOpenModal('chest')}
      ></button>

      {/* 點擊區塊：腹部、四肢 */}
      <button
        className="absolute top-[37%] left-[10%] h-[20%] w-[75%] cursor-pointer bg-transparent"
        aria-label="點擊腹部、四肢"
        title="點擊腹部、四肢"
        onClick={() => handleOpenModal('abdomen')}
      ></button>

      {/* 點擊區塊：下肢 */}
      <button
        className="absolute top-[57%] left-[10%] h-[45%] w-[75%] cursor-pointer bg-transparent"
        aria-label="點擊下肢"
        title="點擊下肢"
        onClick={() => handleOpenModal('limbs-skin')}
      ></button>
    </div>
  );
}

BodyClickableMap.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  symptomDispatch: PropTypes.func.isRequired,
};

export default BodyClickableMap;
