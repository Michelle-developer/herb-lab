import PropTypes from 'prop-types';
import { CircleX, MoveLeft } from 'lucide-react';
import axios from '../../utils/axiosInstance';
import { useFolderContext } from '../../contexts/FolderContext';
import MoveHerbModal from './MoveHerbModal';
import { useState } from 'react';

function HerbCardMenu({ folderId, item }) {
  const { saveDispatch } = useFolderContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetFolder, setTargetFolder] = useState('');
  const herbId = item.herbId._id;

  const handleMoveBetweenFiles = async (herbId, folderId) => {
    setIsModalOpen(true);

    // const fromFolderId = ;
    // const toFolderId = ;
    // try {
    //   const res = await axios.patch('/:fromFolderId/move-item/:toFolderId');
    // } catch (err) {
    //   const errorMsg = err.reponse?.data?.message || '移動失敗，請稍後再試';

    //   alert(errorMsg);
    // }
  };

  const handleRemove = async (herbId, folderId) => {
    const confirmed = window.confirm('確定要刪除此中藥嗎？刪除後無法復原');
    if (!confirmed) return;

    try {
      const res = await axios.patch(
        `/my-lab/folders/${folderId}/remove-item`,
        { id: herbId },
        { withCredentials: true }
      );

      const updatedFolder = res.data.data.folder;

      saveDispatch({
        type: 'updateFolder',
        payload: updatedFolder,
      });

      alert('刪除成功');
    } catch (err) {
      const errorMsg = err.response?.data?.message || '刪除失敗，請稍後再試';

      alert(errorMsg);
    }
  };

  return (
    <div className="pointer-events-none absolute inset-0 hidden bg-black/60 md:group-hover/herb:flex">
      <div className="mt-2 flex w-full items-start justify-around gap-2">
        <button
          onClick={() => handleMoveBetweenFiles(herbId, folderId)}
          className="pointer-events-auto flex gap-0.5 rounded-full bg-stone-700 p-2 text-sm text-stone-200 hover:cursor-pointer hover:bg-stone-900 hover:text-stone-50"
        >
          <MoveLeft size={16} /> 移動
        </button>
        <button
          onClick={() => handleRemove(herbId, folderId)}
          className="pointer-events-auto flex gap-0.5 rounded-full bg-stone-700 p-2 text-sm text-rose-600 hover:cursor-pointer hover:bg-stone-900 hover:text-rose-400"
        >
          <CircleX size={16} /> 刪除
        </button>
      </div>

      {/* 遮罩層：點擊移動按鈕時出現 */}
      {isModalOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          tabIndex={-1}
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        />
      )}
      {/* 點擊移動按鈕 => 開啟目標資料夾選單 Modal */}
      {isModalOpen === true && (
        <MoveHerbModal
          setIsModalOpen={setIsModalOpen}
          onMove={() => setTargetFolder(folderId)}
          herbName={item.herbId.name_zh}
          folderId={folderId}
        />
      )}
    </div>
  );
}

HerbCardMenu.propTypes = {
  folderId: PropTypes.string,
  item: PropTypes.object.isRequired,
};

export default HerbCardMenu;
