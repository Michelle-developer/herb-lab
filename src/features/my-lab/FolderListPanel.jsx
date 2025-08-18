import PropTypes from 'prop-types';
import { FolderClosed, FolderOpen, FolderPlus } from 'lucide-react';
import axios from '../../utils/axiosInstance';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import FolderItemActions from './FolderItemActions';
import { useToastContext } from '../../contexts/ToastContext';

function FolderListPanel({
  folders,
  folderIsLoading,
  openFolder,
  setOpenFolder,
  saveDispatch,
  isReadOnlyMode,
}) {
  const { showToast } = useToastContext();
  const [hasInitialized, setHasInitialized] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);

  const sidebarFolders = folders.filter((folder) => folder.name !== '暫存區');

  // 預設開啟資料夾
  useEffect(() => {
    if (!folderIsLoading && sidebarFolders.length > 0 && !hasInitialized) {
      setOpenFolder(sidebarFolders[0]._id);
      setHasInitialized(true); // 只初始化一次，避免狀態一變就自動導回「預設開啟資料夾」
    }
  }, [folderIsLoading, sidebarFolders]);

  const handleCreateFolder = async () => {
    const defaultName = '新資料夾';
    try {
      const res = await axios.post(
        '/my-lab/folders',
        { name: defaultName },
        { withCredentials: true }
      );

      const newFolder = res.data.data.folder;

      saveDispatch({
        type: 'createFolder',
        payload: newFolder,
      });

      showToast('新增成功！', 'success');
    } catch (err) {
      const errorMsg = err.response?.data?.message || '新增失敗，請稍後再試。';

      showToast(errorMsg, 'error');
    }
  };

  return (
    <>
      {/* 欄標題 + 按鈕 */}
      <h2 className="my-8 text-center text-lg font-semibold" style={{ fontFamily: 'GenRyuMin' }}>
        我的資料夾
      </h2>
      {/* 新增資料夾按鈕 */}
      <button
        onClick={() =>
          isReadOnlyMode
            ? showToast('未登入無法操作此功能，請先登入 😀', 'error')
            : handleCreateFolder()
        }
        className="bg-grass hover:bg-oliver mb-8 ml-4 flex cursor-pointer gap-2 rounded-full px-2 py-1 text-stone-100"
      >
        <FolderPlus strokeWidth={1} />
        <span className="py-0.5 text-center">新增資料夾</span>
      </button>

      {/* 資料夾清單（不含暫存區） */}
      <ul className="divide-land/80 w-full divide-y-1 divide-solid text-stone-500">
        {sidebarFolders.map((folder) => (
          <li
            key={folder._id}
            className={clsx(
              'relative flex h-18 w-full items-center justify-between gap-2 font-semibold',
              folder._id === openFolder && 'border-land ring-land/50 border-y-1 bg-white ring-4'
            )}
          >
            {/* 標示開啟資料夾的裝飾 */}
            {folder._id === openFolder && <div className="bg-oliver h-full w-4 rounded-r-xl" />}
            <div
              className={clsx(
                'flex flex-grow justify-around space-x-1 py-6',
                folder._id === openFolder && 'text-oliver'
              )}
            >
              <button className="cursor-pointer" onClick={() => setOpenFolder(folder._id)}>
                {folder._id === openFolder ? (
                  <FolderOpen className="text-oliver" size={32} strokeWidth={1} />
                ) : (
                  <FolderClosed className="text-stone-500" size={32} strokeWidth={1} />
                )}
              </button>

              {/* 重新命名與否：輸入框 or 資料夾名稱 */}
              <FolderItemActions
                editingFolder={editingFolder}
                setEditingFolder={setEditingFolder}
                folder={folder}
                saveDispatch={saveDispatch}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

FolderListPanel.propTypes = {
  folders: PropTypes.array.isRequired,
  folderIsLoading: PropTypes.bool.isRequired,
  openFolder: PropTypes.string.isRequired,
  setOpenFolder: PropTypes.func.isRequired,
  saveDispatch: PropTypes.func,
};

export default FolderListPanel;
