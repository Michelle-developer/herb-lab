import PropTypes from 'prop-types';
import { SquareX } from 'lucide-react';
import { useFolderContext } from '../../contexts/FolderContext';

function MoveHerbModal({ setIsModalOpen, onMove, herbName, folderId }) {
  const { saveState } = useFolderContext();
  const folders = saveState.folders;
  const originFolderName = folders.find((folder) => folder._id === folderId).name;

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
          當前的資料夾：{originFolderName}。你選擇的中藥是：{herbName}，想把它移到哪個資料夾呢？
        </p>
        {/* {folders.names.map((name)=>)} */}
        <button
          type="submit"
          className="hover:bg-oliver bg-grass min-w-[100px] cursor-pointer items-center rounded-full p-2 text-center text-base text-stone-100 sm:w-1/3 sm:py-3 md:text-lg"
          onClick={(e) => onMove(e.target.value)}
        >
          確定
        </button>
        <button className="hover:bg-oliver bg-grass min-w-[100px] cursor-pointer items-center rounded-full p-2 text-center text-base text-stone-100 sm:w-1/3 sm:py-3 md:text-lg">
          取消
        </button>
      </div>
    </>
  );
}

MoveHerbModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  herbName: PropTypes.string.isRequired,
  folderId: PropTypes.string.isRequired,
};

export default MoveHerbModal;
