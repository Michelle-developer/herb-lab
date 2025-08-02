'use client';
import { FolderClosed } from 'lucide-react';
import ReusableDrawer from '../../components/ReusableDrawer';
import PropTypes from 'prop-types';
import FolderListPanel from './FolderListPanel';

function FolderListDrawer({
  onClick,
  folders,
  folderIsLoading,
  openFolder,
  setOpenFolder,
  saveDispatch,
}) {
  return (
    <ReusableDrawer
      openTrigger={
        <button
          className="ring-land flex h-12 w-12 cursor-pointer place-items-center rounded-full bg-gray-200/50 px-3 py-2 font-semibold hover:bg-gray-950/10 focus:ring-2 focus:outline-none sm:h-16 sm:w-16 sm:px-4 sm:py-2"
          aria-label="開啟資料夾列表抽屜"
          onClick={onClick}
        >
          <FolderClosed className="text-grass h-6 w-6 sm:h-12 sm:w-12" />
        </button>
      }
      className="bg-jade overflow-y-scroll"
    >
      <FolderListPanel
        folders={folders}
        folderIsLoading={folderIsLoading}
        openFolder={openFolder}
        setOpenFolder={setOpenFolder}
        saveDispatch={saveDispatch}
      />
    </ReusableDrawer>
  );
}

FolderListDrawer.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FolderListDrawer;
