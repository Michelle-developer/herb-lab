import PropTypes from 'prop-types';
import { Check, EllipsisVertical, LockKeyhole, X } from 'lucide-react';
import { useState } from 'react';
import axios from '../../utils/axiosInstance';
import FolderDropdownMenu from './FolderDropdownMenu';
import { useFolderContext } from '../../contexts/FolderContext';

function FolderItemActions({ editingFolder, setEditingFolder, folder }) {
  const [editedFolderName, setEditedFolderName] = useState('');
  const { saveDispatch } = useFolderContext();

  async function handleRename(e) {
    e.preventDefault();
    if (!editedFolderName.trim()) return alert('資料夾名稱不能空白');

    try {
      const res = await axios.patch(
        `/my-lab/folders/${editingFolder}`,
        { name: editedFolderName.trim() },
        { withCredentials: true }
      );
      const updatedFolder = res.data.data.folder;
      saveDispatch({ type: 'updateFolder', payload: updatedFolder });
      alert('修改成功');

      setEditingFolder(null);
      setEditedFolderName('');
    } catch (err) {
      const errorMsg = err.response?.data?.message || '重新命名失敗，請稍後再試';

      alert(errorMsg);
    }
  }

  return (
    <>
      {editingFolder === folder._id ? (
        <div className="bg-jade absolute top-0 left-0 z-20 w-full">
          <form onSubmit={handleRename} className="jusitify-between flex items-center gap-2">
            <input
              type="text"
              placeholder=" 輸入名稱"
              value={editedFolderName}
              onChange={(e) => setEditedFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setEditingFolder(null);
                  setEditedFolderName('');
                }
              }}
              className="ml-2 h-[36px] w-full rounded-sm bg-stone-600 text-amber-300 shadow-sm shadow-stone-400 focus:placeholder-amber-300"
            />
            <div className="flex-col items-center justify-center">
              <button
                type="submit"
                className="w-[20px] cursor-pointer items-center rounded-full p-2 text-center"
              >
                <Check size={20} strokeWidth={4} className="text-oliver hover:text-oliver/50" />
              </button>
              <button
                onClick={() => {
                  setEditingFolder(null);
                  setEditedFolderName('');
                }}
                type="button"
                className="w-[20px] cursor-pointer items-center rounded-full p-2 text-center"
              >
                <X size={20} strokeWidth={4} className="text-stone-600 hover:text-stone-400" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>
          {folder.name} <span className="text-sm text-stone-400">({folder.items.length})</span>
        </p>
      )}

      {folder.isProtected ? (
        <LockKeyhole size={18} className="text-stone-400" />
      ) : (
        <FolderDropdownMenu
          openTrigger={
            <div role="button" aria-label="開啟編輯資料夾選單">
              <EllipsisVertical className="cursor-pointer text-stone-400" />
            </div>
          }
          folderId={folder._id} // 給刪除資料夾的後端API用
          onEdit={() => setEditingFolder(folder._id)} // 給重新命名按鈕傳點擊事件上來用
        />
      )}
    </>
  );
}

FolderItemActions.propTypes = {
  folder: PropTypes.object.isRequired,
  editingFolder: PropTypes.string.isRequired,
  setEditingFolder: PropTypes.func.isRequired,
};
export default FolderItemActions;
