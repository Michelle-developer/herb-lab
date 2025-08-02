import PropTypes from 'prop-types';
import { SquareX } from 'lucide-react';
import { useFolderContext } from '../../contexts/FolderContext';
import { useState } from 'react';
import clsx from 'clsx';
import { useToastContext } from '../../contexts/ToastContext';

function MoveHerbModal({ setIsModalOpen, onMove, herbName, folderId }) {
  const { saveState } = useFolderContext();
  const { showToast } = useToastContext();
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const folders = saveState.folders;
  const originFolder = folders.find((folder) => folder._id === folderId);
  const availableFolders = folders.filter((folder) => folder._id !== folderId);

  return (
    <>
      <div className="fixed top-[10%] right-[12%] z-50 h-[70%] w-[70%] items-center justify-center overflow-y-scroll rounded-lg border border-gray-800 bg-gray-50 p-4 shadow-lg sm:top-[20%] sm:left-[30%] sm:h-[75%] sm:w-[40%]">
        <div className="relative">
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="absolute top-0 right-0 cursor-pointer"
          >
            <SquareX className="text-stone-400" />
          </button>
        </div>

        <p className="md:text-md m-4 text-left text-base font-semibold sm:mb-10 lg:text-lg">
          你要移動的中藥是 <span className="text-grass">{herbName}</span> ，請選取目標資料夾：
        </p>

        <p className="text-right text-sm text-stone-600">
          From: <span className="rounded-full bg-stone-200 px-2 py-1"> {originFolder.name} </span>
        </p>

        <div className="text-cente my-4 space-y-2 p-2">
          {availableFolders.map((folder) => (
            <label
              key={folder._id}
              className={clsx(
                'flex cursor-pointer items-center gap-2 text-stone-800',
                folder._id === selectedFolderId
                  ? 'bg-oliver/10 ring-oliver ring-2'
                  : 'hover:bg-stone-200'
              )}
            >
              <input
                type="radio"
                name="folder"
                value={folder._id}
                checked={selectedFolderId === folder._id}
                onChange={() => setSelectedFolderId(folder._id)}
                className="hidden"
              />
              <span className="font-medium">{folder.name}</span>
            </label>
          ))}
        </div>

        <div className="mb-4 flex justify-around gap-4">
          <button
            type="submit"
            className="hover:bg-oliver bg-grass min-w-[100px] cursor-pointer items-center rounded-full p-2 text-center text-base text-stone-100 sm:w-1/3 sm:py-3 md:text-lg"
            onClick={() => {
              if (!selectedFolderId) return showToast('請選取目標資料夾。', 'warn');
              onMove(selectedFolderId);
              setIsModalOpen(false);
            }}
          >
            確定
          </button>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="hover:bg-oliver bg-grass min-w-[100px] cursor-pointer items-center rounded-full p-2 text-center text-base text-stone-100 sm:w-1/3 sm:py-3 md:text-lg"
          >
            取消
          </button>
        </div>
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
