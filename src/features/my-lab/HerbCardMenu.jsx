import PropTypes from 'prop-types';
import { CircleX, MoveLeft } from 'lucide-react';
import axios from '../../utils/axiosInstance';
import { useFolderContext } from '../../contexts/FolderContext';

function HerbCardMenu({ item }) {
  const { saveState, saveDispatch } = useFolderContext();
  const folders = saveState.folders;
  const tempFolder = folders.find((folder) => folder.name === '暫存區');

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
        {/**onClick={handleMoveBetweenFiles} */}
        <button className="pointer-events-auto flex gap-0.5 rounded-full bg-stone-700 p-2 text-sm text-stone-200 hover:cursor-pointer hover:bg-stone-900 hover:text-stone-50">
          <MoveLeft size={16} /> <span className="">移動</span>
        </button>
        <button
          onClick={() => handleRemove(item.herbId._id, tempFolder._id)}
          className="pointer-events-auto flex gap-0.5 rounded-full bg-stone-700 p-2 text-sm text-rose-600 hover:cursor-pointer hover:bg-stone-900 hover:text-rose-400"
        >
          <CircleX size={16} /> 刪除
        </button>
      </div>
    </div>
  );
}

HerbCardMenu.propTypes = {
  item: PropTypes.object.isRequired,
};

export default HerbCardMenu;
