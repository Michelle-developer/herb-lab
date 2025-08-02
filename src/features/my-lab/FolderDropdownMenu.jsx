import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/16/solid';
import { Type } from 'lucide-react';
import { cloneElement, isValidElement } from 'react';
import { useFolderContext } from '../../contexts/FolderContext';
import axios from '../../utils/axiosInstance';
import PropTypes from 'prop-types';
import { useToastContext } from '../../contexts/ToastContext';

export default function FolderDropdownMenu({ openTrigger, folderId, onEdit }) {
  const { saveDispatch } = useFolderContext();
  const { showToast } = useToastContext();

  // 開選單按鈕 UI 由外部傳入 openTrigger，內部確認合法 React 元素 => 複製 + 保留外部事件（ Ex: 資料夾列表 onClick ） + 注入選單開啟功能
  const enhancedTrigger = isValidElement(openTrigger)
    ? cloneElement(openTrigger, {
        onClick: (e) => {
          openTrigger.props.onClick?.(e);
        },
      })
    : null;

  async function handleDelete() {
    const confirmed = window.confirm('確定要刪除此資料夾嗎？刪除後無法復原。');
    if (!confirmed) return;

    try {
      const res = await axios.delete(`/my-lab/folders/${folderId}`, { withCredentials: true });

      const deletedFolder = res.data.data.folder;
      saveDispatch({ type: 'deleteFolder', payload: deletedFolder });

      showToast('刪除成功', 'success');
    } catch (err) {
      const errorMsg = err.response?.data?.message || '刪除失敗，請稍後再試。';

      showToast(errorMsg, 'error');
    }
  }
  return (
    <div className="relative inline-block text-right">
      <Menu as="div" className="relative">
        {(open) => (
          <>
            <MenuButton>{enhancedTrigger}</MenuButton>

            {open && (
              <MenuItems
                transition
                anchor="bottom end"
                className="absolute right-0 z-20 mt-2 w-52 origin-top-right rounded-xl border border-white/5 bg-stone-600 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
              >
                <MenuItem>
                  <button
                    onClick={() => onEdit()}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                  >
                    <Type className="size-4 text-white/30" />
                    重新命名
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                      ⌘E
                    </kbd>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleDelete}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                  >
                    <TrashIcon className="size-4 fill-white/30" />
                    刪除資料夾
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                      ⌘D
                    </kbd>
                  </button>
                </MenuItem>
              </MenuItems>
            )}
          </>
        )}
      </Menu>
    </div>
  );
}

FolderDropdownMenu.propTypes = {
  openTrigger: PropTypes.element.isRequired,
  folderId: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};
