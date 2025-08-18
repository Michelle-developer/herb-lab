import PropTypes from 'prop-types';
import { CircleX, LockKeyhole, MoveLeft } from 'lucide-react';
import axios from '../../utils/axiosInstance';
import MoveHerbModal from './MoveHerbModal';
import { useState } from 'react';
import { useToastContext } from '../../contexts/ToastContext';

function HerbCardMenu({ folderId, item, saveDispatch }) {
  const { showToast } = useToastContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const herbId = item.herbId._id;

  async function handleMove(targetFolderId) {
    if (!targetFolderId) return;

    try {
      const res = await axios.patch(
        `/my-lab/folders/${folderId}/move-item/${targetFolderId}`,
        { id: herbId },
        { withCredentials: true }
      );

      const fromFolder = res.data.data.from;
      const toFolder = res.data.data.to;

      saveDispatch({ type: 'updateFolder', payload: fromFolder });
      saveDispatch({ type: 'updateFolder', payload: toFolder });

      showToast('移動成功！', 'success');
    } catch (err) {
      const errorMsg = err.response?.data?.message || '移動失敗，請稍後再試。';

      showToast(errorMsg, 'error');
    }
  }

  const handleRemove = async (herbId, folderId) => {
    const confirmed = window.confirm('確定要刪除此中藥嗎？刪除後無法復原。');
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

      showToast('刪除成功！', 'success');
    } catch (err) {
      const errorMsg = err.response?.data?.message || '刪除失敗，請稍後再試。';

      showToast(errorMsg, 'error');
    }
  };

  return (
    <div className="absolute top-0 flex w-full">
      <div className="flex w-full items-start justify-between gap-4">
        {item.isProtected ? (
          <LockKeyhole size={18} strokeWidth={1} className="text-stone-400" />
        ) : (
          <>
            <button
              onClick={() => setIsModalOpen(true)}
              className="pointer-events-auto flex gap-0.5 rounded-lg bg-white/30 p-2 text-sm text-stone-400 hover:cursor-pointer hover:bg-stone-300/60 hover:text-stone-600"
            >
              <MoveLeft size={16} /> 移動
            </button>
            <button
              onClick={() => handleRemove(herbId, folderId)}
              className="pointer-events-auto flex gap-0.5 rounded-lg bg-white/30 p-2 text-sm text-rose-400 hover:cursor-pointer hover:bg-stone-300/60 hover:text-rose-600"
            >
              <CircleX size={16} /> 刪除
            </button>
          </>
        )}
      </div>

      {/* 遮罩層：點擊移動按鈕時出現 */}
      {isModalOpen && (
        <>
          <div
            role="presentation"
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setIsModalOpen(false);
            }}
          />

          {/* 點擊移動按鈕 => 開啟目標資料夾選單 Modal */}
          <MoveHerbModal
            setIsModalOpen={setIsModalOpen}
            onMove={async (targetFolderId) => {
              await handleMove(targetFolderId);
              setIsModalOpen(false);
            }}
            // onMove={(targetId) => setTargetFolder(targetId)}
            herbName={item.herbId.name_zh}
            folderId={folderId}
          />
        </>
      )}
    </div>
  );
}

HerbCardMenu.propTypes = {
  folderId: PropTypes.string,
  item: PropTypes.object.isRequired,
  saveDispatch: PropTypes.func.isRequired,
};

export default HerbCardMenu;
