import BodySubgroupModal from "./BodySubgroupModal";

function BodyClickableMap({ isModalOpen, setIsModalOpen, symptomDispatch }) {
  function handleOpenModal(value) {
    setIsModalOpen(true);
    symptomDispatch({ type: "setSubgroup", payload: value });
  }

  return (
    <div className="relative col-start-3 col-end-5 row-start-1 row-end-7 aspect-[1/2] w-[min(100%,300px)]">
      <img
        src="/images/img_show-girl.png"
        className="h-full w-full max-w-[360px] object-cover"
      />

      {/* 點擊區塊：頭面部、五官 */}
      <div
        role="button"
        tabIndex={0}
        className="absolute top-[0%] left-[10%] h-[22%] w-[75%] cursor-pointer bg-transparent"
        aria-label="點擊頭部"
        onClick={() => handleOpenModal("head")}
      ></div>

      {/* 部位子選單 */}
      {isModalOpen && <BodySubgroupModal setIsModalOpen={setIsModalOpen} />}

      {/* 點擊區塊：胸部、四肢 */}
      <button
        className="absolute top-[22%] left-[10%] h-[15%] w-[75%] cursor-pointer bg-transparent"
        aria-label="點擊胸部"
        onClick={() => handleOpenModal("chest")}
      ></button>

      {/* 點擊區塊：腹部、四肢 */}
      <button
        className="absolute top-[37%] left-[10%] h-[20%] w-[75%] cursor-pointer bg-transparent"
        aria-label="點擊腹部"
        onClick={() => handleOpenModal("abdomen")}
      ></button>

      {/* 點擊區塊：四肢 */}
      <button
        className="absolute top-[57%] left-[10%] h-[45%] w-[75%] cursor-pointer bg-transparent"
        aria-label="點擊下肢"
        onClick={() => handleOpenModal("limbs-skin")}
      ></button>
    </div>
  );
}

export default BodyClickableMap;
